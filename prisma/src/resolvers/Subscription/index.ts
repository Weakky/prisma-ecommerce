import { Context } from '../../utils';
import { buildProductWithUnavailableOptionsValues } from '../../common/productWithUnavailableOptionsValues';
import { ProductSubscriptionPayload } from '../../generated/prisma';

export const Subscription = {
  updatedProduct: {
    subscribe(parent, args, ctx: Context, info) {
      return ctx.db.subscription.product({ where: { mutation_in: ['UPDATED'] } }, `{
        updatedFields
        node {
          id
          name
          imageUrl
          displayPrice
          brand {
            id
            name
          }
          options {
            id
            name
            values {
              id
              name
            }
          }
          variants {
            id
            available
            price
            selectedOptions {
              id
              option {
                id
                name
              }
              value {
                id
                name
              }
            }
          }
        }
      }`);
    },
    resolve(payload: { product: ProductSubscriptionPayload }, args, ctx: Context, info) {
      return buildProductWithUnavailableOptionsValues(payload.product.node);
    }
  }
};