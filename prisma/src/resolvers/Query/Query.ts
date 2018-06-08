import { getUserId, getShopId, Context } from '../../utils'



export const Query = {
  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info)
  },
  product(parent, args, ctx: Context, info) {
    return ctx.db.query.product({ where: { id: args.id } }, info);
  },
  async allProducts(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);

    return ctx.db.query.products({
      where: { deletedAt: null, shop: { id: shopId } }
    }, info);
  },
  async searchProducts(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);

    const where = {
      ...(args.brandsIds && args.brandsIds.length > 0 && { brand: { id_in: args.brandsIds } }),
      ...(args.attributesIds && args.attributesIds.length > 0 && { attributes_some: { id_in: args.attributesIds } }),
      ...(args.optionsValuesIds && args.optionsValuesIds.length > 0 && { options_some: { values_some: { id_in: args.optionsValuesIds } } }),
      ...(!!args.productName && { name_contains: args.productName }),
      ...(!!args.categoryId && { category: { id: args.categoryId } }),
      shop: { id: shopId },
      deletedAt: null,
    };

    return ctx.db.query.productsConnection({
      where,
      first: args.first,
      skip: args.skip
    }, info);
  },
  async allBrands(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);

    if (args.categoryId) {
      return ctx.db.query.brands({ where: { category: { id: args.categoryId }, shop: { id: shopId } } }, info);
    }

    return ctx.db.query.brands({ where: { shop: { id: shopId } } }, info);
  },
  async allCategories(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);

    return ctx.db.query.categories({ where: { shop: { id: shopId } } }, info);
  },
  async allOptions(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);

    if (args.categoryId) {
      return ctx.db.query.options({ where: { category: { id: args.categoryId }, shop: { id: shopId } } }, info);
    }

    return ctx.db.query.options({ where: { shop: { id: shopId } } }, info);
  },
  async allAttributes(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);

    if (args.categoryId) {
      return ctx.db.query.attributes({ where: { category: { id: args.categoryId }, shop: { id: shopId } } }, info);      
    }

    return ctx.db.query.attributes({ where: { shop: { id: shopId } } }, info);
  },
  async allOrders(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);

    return ctx.db.query.orders({ where: { receiver: { id: shopId } } }, info);
  },
  async allCustomers(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);
    return ctx.db.query.users({
      where: {
        orders_some: {
          receiver: { id: shopId }
        }
      }
    }, info);
  },
  async allShops(parent, args, ctx: Context, info) {
    return ctx.db.query.shops({}, info);
  }
};
