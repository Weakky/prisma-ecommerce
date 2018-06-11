import { Context, getUserId } from "../../utils";
import * as _ from "lodash";
import { Order, Prisma, OrderStatus } from "../../generated/prisma";
import { sendNotificationToOne } from "../../third-party/oneSignal";

interface CreateOrderInput {
  userId: string
  orderStatus: OrderStatus
  emptyCart: boolean
}

export async function createOrderFromCart(args: CreateOrderInput, db: Prisma): Promise<Order> {
  const { selectedShop: { id: shopId }, cart } = await db.query.user(
    { where: { id: args.userId } },
    `{
      shop { id }
      cart {
        id
        quantity
        variant {
          id
          price
        }
      }
    }`
  );

  if (cart.length === 0) {
    return null;
  }

  const lineItemsIds = cart.map(lineItem => ({ id: lineItem.id }));
  const totalPrice = _.sumBy(
    cart,
    lineItem => lineItem.quantity * lineItem.variant.price
  );

  if (args.emptyCart) {
    await db.mutation.updateUser({
      where: { id: args.userId },
      data: {
        cart: { disconnect: lineItemsIds }
      }
    });
  }

  const newOrder = await db.mutation.createOrder({
    data: {
      owner: { connect: { id: args.userId } },
      receiver: { connect: { id: shopId } },
      lineItems: { connect: lineItemsIds },
      totalPrice,
      totalTax: 0,
      totalRefunded: 0,
      orderStatus: args.orderStatus
    }
  });

  return newOrder;
}

export async function emptyCartForUser(userId, db: Prisma): Promise<{}> {
  const { cart } = await db.query.user(
    { where: { id: userId } },
    `{
      cart {
        id
        quantity
        variant {
          id
          price
        }
      }
    }`
  );

  if (cart.length === 0) {
    return null;
  }

  const lineItemsIds = cart.map(lineItem => ({ id: lineItem.id }));
  const totalPrice = _.sumBy(
    cart,
    lineItem => lineItem.quantity * lineItem.variant.price
  );

  await db.mutation.updateUser({
    where: { id: userId },
    data: {
      cart: { disconnect: lineItemsIds }
    }
  });
}

export const order = {
  async setOrderAsPrepared(parent, args, ctx: Context, info) {
    const currentOrder = await ctx.db.query.order({ where: { id: args.orderId } }, `
      {
        id
        orderStatus
        owner {
          id
          oneSignalUserId
        }
      }
    `);

    if (currentOrder.orderStatus === 'SUBMITTED' || currentOrder.orderStatus === 'FAILED') {
      throw new Error('You can set an order to prepared, only once it has been paid.');
    }

    if (currentOrder.orderStatus === 'PREPARED') {
      throw new Error('You can set an order to prepared only once');
    }

    const updatedOrder = await ctx.db.mutation.updateOrder({
      where: { id: args.orderId },
      data: { orderStatus: 'PREPARED' }
    }, info);

    if (updatedOrder) {
      // Send notification to owner of order when set to prepared
      if (updatedOrder.owner.oneSignalUserId) {
        try {
          await sendNotificationToOne(
            updatedOrder.owner.oneSignalUserId,
            "Votre commande est prête !",
            "Rendez-vous dans votre magasin pour récupérer votre commande."
          );
        } catch (e) {
          console.log(e);
        }
      }
    }

    return updatedOrder;
  }
}