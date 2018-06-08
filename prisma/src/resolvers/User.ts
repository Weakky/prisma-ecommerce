import { Context, getUserId, getShopIdFromUserId } from "../utils";

export const User = {
  // Grab only orders made to the selectedShop of the user,
  // So that he cannot add an order to his cart with product
  // That were ordered from another Shop (that can potentially not be available)
  async orders(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx);
    const shopId = await getShopIdFromUserId(userId, ctx);
    const ordersIds = parent.orders.map(order => order.id);

    console.log(parent);

    return ctx.db.query.orders({
      where: {
        id_in: ordersIds,
        owner: { id: userId },
        receiver: { id: shopId }
      }
    }, info)
  }
}