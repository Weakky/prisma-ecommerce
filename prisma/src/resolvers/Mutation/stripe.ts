import { Context, getUserId } from '../../utils';
import { Prisma, OrderStatus, Order } from '../../generated/prisma'

import { server, db } from '../../index';
import * as Stripe from 'Stripe';
import { createOrderFromCart, emptyCartForUser } from './order';
const stripe: any = new Stripe(process.env.STRIPE_SECRET_KEY);

interface PayPayload {
  redirectUrl?: string
  order: any
}

interface CreateChargeInput {
  userId: string
  email: string
  sourceId: string
  amount: number,
}

interface Error {
  error?: string
}

interface CreateChargeWithOrder extends Error {
  order?: Order
}

interface CreateCharge extends Error {
  charge?: any
}

interface CreateChargeAndUpdateOrder {
  sourceId: string,
  amount: string,
  email: string,
  orderId: string,
  userId: string
}

async function createCharge({ sourceId, amount, email }): Promise<CreateCharge> {
  let charge;
  let orderStatus: OrderStatus;

  try {
    charge = await stripe.charges.create({
      source: sourceId,
      amount,
      currency: 'eur',
      receipt_email: email,
    });
  } catch (err) {
    return { error: err.message };
  }

  return {
    charge: charge
  };
}

export async function createChargeWithOrder(params: CreateChargeInput, db: Prisma): Promise<CreateChargeWithOrder> {
  const { charge, error } = await createCharge({ sourceId: params.sourceId, amount: params.amount, email: params.email });
  const orderStatus = (!error && charge && charge.status === 'succeeded') ? 'PAID' : 'FAILED';

  const newOrder = await createOrderFromCart({
    orderStatus,
    userId: params.userId,
    emptyCart: orderStatus === 'PAID'
  }, db);

  return {
    order: newOrder
  }
}

export async function createChargeAndUpdateOrder(params: CreateChargeAndUpdateOrder, db: Prisma): Promise<void> {
  const { charge, error } = await createCharge({ sourceId: params.sourceId, amount: params.amount, email: params.email });
  const orderStatus = (!error && charge && charge.status === 'succeeded') ? 'PAID' : 'FAILED';

  if (orderStatus === 'PAID') {
    await emptyCartForUser(params.userId, db);
  }

  await updateOrder(params.orderId, orderStatus);
}

export async function updateOrder(orderId: string, orderStatus: OrderStatus): Promise<Order> {
  return db.mutation.updateOrder({
    where: { id: orderId },
    data: { orderStatus }
  });
}

function createSource(stripeTokenId) {
  return stripe.sources.create({
    type: 'card',
    token: stripeTokenId,
    currency: 'eur',
  });
}

function create3DSecureSource({ sourceId, metadata, amount }) {
  return stripe.sources.create({
    type: 'three_d_secure',
    currency: 'eur',
    amount: amount,
    three_d_secure: {
      card: sourceId,
    },
    redirect: {
      return_url: 'aromaclop://payment'
    },
    metadata
  });
}

export const payment = {
  //TODO: remove hardcoded amount later
  async pay(parent, args, ctx: Context, info): Promise<PayPayload> {
    const amount = 100;
    const userId = getUserId(ctx);
    const user = await ctx.db.query.user({ where: { id: userId } }, `{ email }`);
    let source = null;

    // Create source to find whether user is chargeable or needs 3DSecure authorization.
    try {
      source = await createSource(args.stripeTokenId);
    } catch (err) {
      throw new Error(err.message);
    }

    // If source is already chargeable and doesn't require 3D Secure:
    // 1. Charge user.
    // 2. If user charge is succesful, create order with status PAID, otherwise as FAILED
    // 3. Empty cart only if charge is succesful
    if (source.status === 'chargeable' && source.card.three_d_secure && source.card.three_d_secure !== 'required') {
      const { order } = await createChargeWithOrder({
        sourceId: source.id,
        amount: amount,
        email: user.email,
        userId,
      }, db);

      return {
        order
      };
    }

    // If source requires 3DSecure:
    // 1. Create order with status === 'SUBMITTED'
    // 2. Dynamically create a 3DSecure source to grab redirect link
    // 3. Wait for user to authorize/decline, and for stripe to push on the /stripe webhook
    // 4. If user authorized AND charge is succesful, update according order to PAID, otherwise to FAILED
    if (source.card.three_d_secure === 'required') {
      try {
        const submittedOrder = await createOrderFromCart({
          orderStatus: "SUBMITTED",
          userId,
          emptyCart: false,
        }, db);

        // Metadata are used to find corresponding order in the stripe webhook
        source = await create3DSecureSource({
          sourceId: source.id,
          amount,
          metadata: {
            orderId: submittedOrder.id,
            email: user.email,
            amount,
            userId, // Used to empty cart in createChargeAndUpdateOrder()
          }
        });

        return {
          redirectUrl: source.redirect.url,
          order: submittedOrder
        };
      } catch(err) {
        throw new Error(err.message);
      }
    }

    // Unknown case: we don't support your card ?
    return {
      order: null
    }
  },
};