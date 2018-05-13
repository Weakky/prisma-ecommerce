import { Context } from '../../utils';

export const attribute = {
  upsertAttribute(parent, args, ctx: Context, info) {
    if (args.attributeId) {
      return ctx.db.mutation.updateAttribute({
        where: { id: args.attributeId },
        data: { value: args.value, category: { connect: { id: args.categoryId } } }
      }, info);
    }

    return ctx.db.mutation.createAttribute({
      data: { value: args.value, category: { connect: { id: args.categoryId } } },
    }, info);
  },

  deleteAttribute(parent, args, ctx: Context, info) {
    return ctx.db.mutation.deleteAttribute({ where: { id: args.attributeId } });
  },
};