import { Context, getUserId } from "../../utils";
import * as _ from 'lodash';
import { Order } from "../../generated/prisma";
import { createWriteStream } from "fs";
import { disconnect } from "cluster";

//TODO: Create stripe payment
export const order = {
  async checkout(parent, args, ctx: Context, info): Promise<Order> {
    const userId = getUserId(ctx);
    const { cart } = await ctx.db.query.user({ where: { id: userId } }, `{
      cart {
        id
        quantity
        variant {
          id
          price
        }
      }
    }`);

    if (cart.length === 0) {
      return null;
    }

    const lineItemsIds = cart.map((lineItem) => ({ id: lineItem.id }));
    const totalPrice = _.sumBy(cart, (lineItem) => lineItem.quantity * lineItem.variant.price );

    await ctx.db.mutation.updateUser({
      where: { id: userId },
      data: {
        cart: { disconnect: lineItemsIds }
      }
    })

    const newOrder = await ctx.db.mutation.createOrder({
      data: {
        owner: { connect: { id: userId } },
        lineItems: { connect: lineItemsIds },
        totalPrice,
        totalTax: 0,
        totalRefunded: 0,
        orderStatus: 'SUBMITTED',
      }
    });
  },
};