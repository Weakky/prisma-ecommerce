import { Context, getUserId } from "../../utils";
import { OrderLineItem } from "../../generated/prisma";

export const cart = {
  async addItemToCart(parent, args, ctx: Context, info): Promise<OrderLineItem> {
    const userId = getUserId(ctx);

    // Find if there's any existing lineItem. If so, update the quantity
    const orderLineItem = await ctx.db.query.orderLineItems({
      where: {
        owner: { id: userId },
        variant: { id: args.variantId }
      }
    }, '{ id }');

    if (orderLineItem.length > 1) {
      throw new Error('More than one same line item found in the cart. Should not be possible');
    }

    if (orderLineItem.length === 1) {
      return ctx.db.mutation.updateOrderLineItem({
        where: { id: orderLineItem[0].id },
        data: {
          quantity: args.quantity,
        }
      }, info);
    }

    return ctx.db.mutation.createOrderLineItem({
      data: {
        owner: { connect: { id: userId } },
        quantity: args.quantity,
        variant: { connect: { id: args.variantId } } 
      }
    }, info);
  },

  async removeItemFromCart(parent, args, ctx: Context, info): Promise<OrderLineItem> {
    const userId = getUserId(ctx);

    if (!ctx.db.exists.User({ id: userId, cart_some: { id: args.lineItemId } })) {
      throw new Error('You\'re not owner of this cart.');
    }

    return ctx.db.mutation.deleteOrderLineItem({
      where: { id: args.lineItemId }
    }, info);
  },

  async updateItemFromCart(parent, args, ctx: Context, info): Promise<OrderLineItem> {
    const userId = getUserId(ctx);

    if (!ctx.db.exists.User({ id: userId, cart_some: { id: args.lineItemId } })) {
      throw new Error('You\'re not owner of this cart.');
    }

    return ctx.db.mutation.updateOrderLineItem({
      where: { id: args.lineItemId },
      data: {
        variant: {
          connect: { id: args.variantId },
        },
        quantity: args.quantity
      }
    }, info);
  }
};
