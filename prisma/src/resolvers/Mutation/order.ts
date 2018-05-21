import { Context, getUserId } from "../../utils";
import * as _ from "lodash";
import { Order, Prisma, OrderStatus } from "../../generated/prisma";

interface CreateOrderInput {
  userId: string
  orderStatus: OrderStatus
  emptyCart: boolean
}

export async function createOrderFromCart(args: CreateOrderInput, db: Prisma): Promise<Order> {
  const { cart } = await db.query.user(
    { where: { id: args.userId } },
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