import { Context, getShopId } from '../../utils';

export const category = {
  async upsertCategory(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);

    if (args.categoryId) {
      return ctx.db.mutation.updateCategory({
        where: { id: args.categoryId },
        data: { name: args.name }
      }, info);
    }

    return ctx.db.mutation.createCategory({
      data: {
        name: args.name,
        shop: { connect: { id: shopId } }
      },
    }, info);
  },

  deleteCategory(parent, args, ctx: Context, info) {
    return ctx.db.mutation.deleteCategory({ where: { id: args.categoryId } });
  },
};