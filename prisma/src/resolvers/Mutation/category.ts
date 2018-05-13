import { Context } from '../../utils';

export const category = {
  upsertCategory(parent, args, ctx: Context, info) {
    if (args.categoryId) {
      return ctx.db.mutation.updateCategory({
        where: { id: args.categoryId },
        data: { name: args.name }
      }, info);
    }

    return ctx.db.mutation.createCategory({
      data: { name: args.name },
    }, info);
  },

  deleteCategory(parent, args, ctx: Context, info) {
    return ctx.db.mutation.deleteCategory({ where: { id: args.categoryId } });
  },
};