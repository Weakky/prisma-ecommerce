import { getUserId, Context } from '../../utils'

export const Query = {
  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info)
  },
  product(parent, args, ctx: Context, info) {
    return ctx.db.query.product({ where: { id: args.id } }, info);
  },
  allProducts(parent, args, ctx: Context, info) {
    return ctx.db.query.products({...args}, info);
  },
  searchProducts(parent, args, ctx: Context, info) {
    const where = {
      ...(args.brandsIds && args.brandsIds.length > 0 && { brand: { id_in: args.brandsIds } }),
      ...(args.attributesIds && args.attributesIds.length > 0 && { attributes_some: { id_in: args.attributesIds } }),
      ...(args.optionsValuesIds && args.optionsValuesIds.length > 0 && { options_some: { values_some: { id_in: args.optionsValuesIds } } }),
      ...(!!args.productName && { name_contains: args.productName }),
      ...(!!args.categoryId && { category: { id: args.categoryId } }),
    };

    return ctx.db.query.productsConnection({
      where,
      first: args.first,
      skip: args.skip
    }, info);
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
  allOrders(parent, args, ctx: Context, info) {
    return ctx.db.query.orders({}, info);
  }
};
