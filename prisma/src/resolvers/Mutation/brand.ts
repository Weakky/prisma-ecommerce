import { Context, getShopId } from "../../utils";

export const brand = {
  async upsertBrand(parent, args, ctx: Context, info) {
    if (args.brandId) {
      return ctx.db.mutation.updateBrand({
        where: { id: args.brandId },
        data: { name: args.name, category: { connect: { id: args.categoryId } } }
      }, info);
    }

    const shopId = await getShopId(ctx);

    return ctx.db.mutation.createBrand({
      data: {
        name: args.name,
        shop: { connect: { id: shopId } },
        category: { connect: { id: args.categoryId } },
      },
    }, info);
  },

  deleteBrand(parent, args, ctx: Context, info) {
    return ctx.db.mutation.deleteBrand({ where: { id: args.brandId } });
  },
}