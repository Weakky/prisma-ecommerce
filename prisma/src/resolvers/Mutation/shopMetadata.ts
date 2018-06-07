import { Context, getShopId } from '../../utils';
import * as _ from 'lodash';

interface OrderableProductInput {
  id: string,
  productId: string,
  position: number
}

export const shopMetadata = {
  async upsertBestSellerProducts(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);

    const buildCreateInput = (products) =>
      products.map((bestSellerProduct: OrderableProductInput) => ({
        product: { connect: { id: bestSellerProduct.productId } },
        position: bestSellerProduct.position
      }));

    const currentShop = await ctx.db.query.shop({ where: { id: shopId } }, `
      {
        bestSellerProducts {
          id
          product { id }
        }
      }`);

    const productsToDelete = _(currentShop.bestSellerProducts)
      .differenceBy(args.bestSellerProducts, 'id')
      .map(orderableProduct => ({ id: orderableProduct.id }))
      .value();
    const productsToConnect = _.differenceBy(args.bestSellerProducts, currentShop.bestSellerProducts, 'id')
    const productsToUpdate = args.bestSellerProducts
      .filter((orderableProduct: OrderableProductInput) =>
        !!currentShop.bestSellerProducts.find((currentProduct) => currentProduct.id === orderableProduct.id)
      )
      .map((orderableProduct: OrderableProductInput) => ({
        where: { id: orderableProduct.id },
        data: { position: orderableProduct.position }
      }));

    return ctx.db.mutation.updateShop({
      where: { id: shopId },
      data: {
        bestSellerProducts: {
          create: buildCreateInput(productsToConnect),
          delete: productsToDelete,
          update: productsToUpdate,
        }
      },
    }, info);
  },
  
  async upsertNewProducts(parent, args, ctx: Context, info) {
    const shopId = await getShopId(ctx);

    const buildCreateInput = (products) =>
      products.map((newProduct: OrderableProductInput) => ({
        product: { connect: { id: newProduct.productId } },
        position: newProduct.position
      }));

    const currentShop = await ctx.db.query.shop({ where: { id: shopId } }, `
      {
        newProducts {
          id
          product { id }
        }
      }`);

    const productsToDelete = _(currentShop.newProducts)
      .differenceBy(args.newProducts, 'id')
      .map(orderableProduct => ({ id: orderableProduct.id }))
      .value();
    const productsToConnect = _.differenceBy(args.newProducts, currentShop.newProducts, 'id')
    const productsToUpdate = args.newProducts
      .filter((orderableProduct: OrderableProductInput) =>
        !!currentShop.newProducts.find((currentProduct) => currentProduct.id === orderableProduct.id)
      )
      .map((orderableProduct: OrderableProductInput) => ({
        where: { id: orderableProduct.id },
        data: { position: orderableProduct.position }
      }));

    return ctx.db.mutation.updateShop({
      where: { id: shopId },
      data: {
        newProducts: {
          create: buildCreateInput(productsToConnect),
          delete: productsToDelete,
          update: productsToUpdate,
        }
      },
    }, info);
  },

//   async upsertMOTD(parent, args, ctx: Context, info) {
//     if (!ctx.db.exists.ShopMetadata({})) {
//       return ctx.db.mutation.createShopMetadata({
//         data: { MOTD: args.MOTD }
//       });
//     }

//     return ctx.db.mutation.updateShopMetadata({
//       where: { id: args.shopMetadataId },
//       data: { MOTD: args.MOTD }
//     });
//   },
}
