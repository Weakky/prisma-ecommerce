import { Context, getUserId, getShopId, getShopIdFromUserId } from "../../utils";
import * as _ from 'lodash';
import { OrderLineItem } from "../../generated/prisma";
import {
  OrderLineItemNotFoundException,
  OrderNotFoundException,
  ProductNotFoundException,
  ProductOrVariantNotFoundException,
  OrderNotSentToCurrentShopException,
} from '../../exceptions';
import { createError } from "apollo-errors";

interface OrderLineItemInput {
  variantId: string,
  quantity: number
}

export const cart = {
  //args: VariantId: ID!, quantity: Int!
  async addItemToCart(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx);
    const shopId = await getShopIdFromUserId(userId, ctx);

    if (!(await ctx.db.exists.Variant({ id: args.variantId }))) {
      throw new ProductNotFoundException();
    }

    // Find if there's any existing lineItem. If so, update the quantity
    const orderLineItems = await ctx.db.query.orderLineItems({
      where: {
        owner: { id: userId },
        variant: { id: args.variantId },
      }
    }, '{ id quantity }');

    if (orderLineItems.length > 1) {
      throw new Error('More than one same line item found in the cart. Should not be possible');
    }

    if (orderLineItems.length === 1) {
      const orderLineItem = orderLineItems[0];

      return ctx.db.mutation.updateOrderLineItem({
        where: { id: orderLineItem.id },
        data: {
          quantity: args.mergeQuantities ? args.quantity + orderLineItem.quantity : args.quantity
        }
      }, info);
    }

    return ctx.db.mutation.createOrderLineItem({
      data: {
        owner: { connect: { id: userId } },
        shop: { connect: { id: shopId } },
        quantity: args.quantity,
        variant: { connect: { id: args.variantId } }
      }
    }, info);
  },

  // args orderId: ID!, replace: Boolean!
  async addOrderToCart(parent, args, ctx: Context, info): Promise<OrderLineItem[]> {
    const userId = getUserId(ctx);
    const shopId = await getShopId(ctx);

    const order = await ctx.db.query.order({ where: { id: args.orderId } }, `{
      id
      receiver { id }
      lineItems {
        id
        quantity
        variant {
          id
          product {
            id
          }
        }
      }
    }`);


    if (order.receiver.id !== shopId) {
      throw new OrderNotSentToCurrentShopException();
    }

    if (!order) {
      throw new OrderNotFoundException();
    }

    // Add to the cart only the lineItems that have a product that still exists
    const existingProducts = await Promise.all(
      order.lineItems.map(lineItem => ctx.db.exists.Product({ id: lineItem.variant.product.id, deletedAt: null }))
    );
    const lineItemsWithExistingProduct = order.lineItems.filter((_, i) => existingProducts[i]);

    const currentCart = await ctx.db.query.user({ where: { id: userId } }, `{ cart { id quantity variant { id } } }`).then(user => user.cart);

    // Delete all items from cart that are not in the order
    if (args.replace) {
      const cartLineItemsToDelete = _.differenceBy(currentCart, lineItemsWithExistingProduct, (lineItem) => lineItem.variant.id);

      await Promise.all(
        cartLineItemsToDelete.map(lineItem => ctx.db.mutation.deleteOrderLineItem({ where: { id: lineItem.id } }))
      );
    }

    return await Promise.all(
      lineItemsWithExistingProduct.map(orderLineItem => {
        const cartOrderLineItem = currentCart.find(cartLineItem => cartLineItem.variant.id === orderLineItem.variant.id);

        if (cartOrderLineItem) {
          return ctx.db.mutation.updateOrderLineItem({
            where: { id: cartOrderLineItem.id },
            data: {
              quantity: args.replace
                ? orderLineItem.quantity
                : orderLineItem.quantity + cartOrderLineItem.quantity
            }
          }, info);
        }

        return ctx.db.mutation.createOrderLineItem({
          data: {
            owner: { connect: { id: userId } },
            shop: { connect: { id: shopId } },
            quantity: orderLineItem.quantity,
            variant: { connect: { id: orderLineItem.variant.id } }
          }
        }, info);
      })
    )
  },

  async removeItemFromCart(parent, args, ctx: Context, info): Promise<OrderLineItem> {
    const userId = getUserId(ctx);

    if (!(await ctx.db.exists.User({ id: userId, cart_some: { id: args.lineItemId } }))) {
      throw new Error('You\'re not owner of this cart.');
    }

    if (!(await ctx.db.exists.OrderLineItem({ id: args.lineItemId }))) {
      throw new OrderLineItemNotFoundException();
    }

    return ctx.db.mutation.deleteOrderLineItem({
      where: { id: args.lineItemId }
    }, info);
  },

  async updateItemFromCart(parent, args, ctx: Context, info): Promise<OrderLineItem> {
    const userId = getUserId(ctx);

    if (!(await ctx.db.exists.User({ id: userId, cart_some: { id: args.lineItemId } }))) {
      throw new Error('You\'re not owner of this cart.');
    }

    if (await !ctx.db.exists.OrderLineItem({ id: args.lineItemId })) {
      throw new Error('This line item doesn\'t exist anymore');
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
  },
};
