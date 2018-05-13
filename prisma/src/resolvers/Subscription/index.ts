import { Context } from '../../utils';

export const Subscription = {
  updatedProduct: {
    subscribe(parent, args, ctx: Context, info) {
      return ctx.db.subscription.product({ where: { mutation_in: ['UPDATED'] } }, info);
    },
    resolve(payload, args, ctx: Context, info) {
      return payload.updatedProduct;
    }
  }
};