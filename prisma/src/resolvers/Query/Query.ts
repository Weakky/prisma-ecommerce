import { getUserId, Context } from '../../utils'
import { buildProductWithUnavailableOptionsValues } from '../../common/productWithUnavailableOptionsValues';
import * as _ from 'lodash';

export const Query = {
  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info)
  },
  async product(parent, args, ctx: Context, info) {
    const product = await ctx.db.query.product({ where: { id: args.id } }, info);

    return product;
  },
  allProducts(parent, args, ctx: Context, info) {
    return ctx.db.query.products({...args}, info);
  },
  // searchProducts(parent, args, ctx: Context, info) {
  //   return ctx.db.query.products({ where: { name_contains: args.query } }, info);
  // },
  async searchProducts(parent, args, ctx: Context, info) {
    const where = {
      ...(args.brandsIds && args.brandsIds.length > 0 && { brand: { id_in: args.brandsIds } }),
      ...(args.attributesIds && args.attributesIds.length > 0 && { attributes_some: { id_in: args.attributesIds } }),
      ...(args.optionsValuesIds && args.optionsValuesIds.length > 0 && { options_some: { values_some: { id_in: args.optionsValuesIds } } }),
      ...(!!args.productName && { name_contains: args.productName }),
      ...(!!args.categoryId && { category: { id: args.categoryId } }),
    };

    const productsConnection = await ctx.db.query.productsConnection({
      where,
      first: args.first,
      skip: args.skip
    }, `{ 
      aggregate { count }
      edges {
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
            values {
              id
              name
            }
          }
          variants {
            id
            available
            selectedOptions {
              id
              option {
                id
              }
              value {
                id
                name
              }
            }
          }
        }
      }
    }`);

    const productConnectionWithUnavailableOptionValues = {
      ...productsConnection,
      edges: productsConnection.edges.map(edge => ({
        ...edge,
        node: buildProductWithUnavailableOptionsValues(edge.node)
      }))
    };

    return productConnectionWithUnavailableOptionValues;
  },
  allBrands(parent, args, ctx: Context, info) {
    if (args.categoryId) {
      return ctx.db.query.brands({ where: { category: { id: args.categoryId } } }, info);
    }

    return ctx.db.query.brands({...args}, info);
  },
  allCategories(parent, args, ctx: Context, info) {
    return ctx.db.query.categories({...args}, info);
  },
  allOptions(parent, args, ctx: Context, info) {
    if (args.categoryId) {
      return ctx.db.query.options({ where: { category: { id: args.categoryId } } }, info);
    }
    return ctx.db.query.options({...args}, info);
  },
  allAttributes(parent, args, ctx: Context, info) {
    if (args.categoryId) {
      return ctx.db.query.attributes({ where: { category: { id: args.categoryId } } }, info);
    }
    return ctx.db.query.attributes({...args}, info);
  },
};
