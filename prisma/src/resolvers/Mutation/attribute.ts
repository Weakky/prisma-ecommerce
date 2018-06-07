import { Context, getShopId } from '../../utils';

export const attribute = {
  async upsertAttribute(parent, args, ctx: Context, info) {
    if (args.attributeId) {
      return ctx.db.mutation.updateAttribute({
        where: { id: args.attributeId },
        data: { value: args.value, category: { connect: { id: args.categoryId } } }
      }, info);
    }

    const shopId = await getShopId(ctx);

    return ctx.db.mutation.createAttribute({
      data: {
        value: args.value,
        shop: { connect: { id: shopId } },
        category: { connect: { id: args.categoryId } }
      },
    }, info);
  },

  deleteAttribute(parent, args, ctx: Context, info) {
    return ctx.db.mutation.deleteAttribute({ where: { id: args.attributeId } });
  },
};