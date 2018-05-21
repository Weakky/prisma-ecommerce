import { Context, getUserId } from '../../utils';

export const Subscription = {
  updatedProduct: {
    subscribe(parent, args, ctx: Context, info) {
      return ctx.db.subscription.product({ where: { mutation_in: ['UPDATED'] } }, info);
    },
    resolve(payload, args, ctx: Context, info) {
      return payload.updatedProduct;
    }
  },
  waitFor3DSecure: {
    subscribe: (parent, args, ctx: Context, info) => {
      return ctx.db.subscription.order({
        where: {
          mutation_in: ['UPDATED'],
          node: {
            id: args.orderId
          }
        }
      }, info);
    },
    resolve: (payload, args, context, info) => {
      return payload.waitFor3DSecure;
    },
  }
};