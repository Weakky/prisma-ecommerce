import { Context } from '../../utils';
import * as _ from 'lodash';

interface OrderableProductInput {
  id: string,
  productId: string,
  position: number
}

export const shopMetadata = {
  async upsertBestSalesProducts(parent, args, ctx: Context, info) {
    const buildCreateInput = (products) =>
      products.map((bestSaleProduct: OrderableProductInput) => ({
        product: { connect: { id: bestSaleProduct.productId } },
        position: bestSaleProduct.position
      }));

    if (args.shopMetadataId) {
      const currentShop = await ctx.db.query.shopMetadata({ where: { id: args.shopMetadataId } }, `{ bestSalesProducts { id product { id } } }`);

      const productsToDelete = _(currentShop.bestSalesProducts)
        .differenceBy(args.bestSalesProducts, 'id')
        .map(orderableProduct => ({ id: orderableProduct.id }))
        .value();
      const productsToConnect = _.differenceBy(args.bestSalesProducts, currentShop.bestSalesProducts, 'id')
      const productsToUpdate = args.bestSalesProducts
        .filter((orderableProduct: OrderableProductInput) =>
          !!currentShop.bestSalesProducts.find((currentProduct) => currentProduct.id === orderableProduct.id)
        )
        .map((orderableProduct: OrderableProductInput) => ({
          where: { id: orderableProduct.id },
          data: { position: orderableProduct.position }
        }));

      return ctx.db.mutation.updateShopMetadata({
        where: { id: args.shopMetadataId },
        data: { bestSalesProducts: {
          delete: productsToDelete,
          create: buildCreateInput(productsToConnect),
          update: productsToUpdate
        }}
      });
    }
    return ctx.db.mutation.createShopMetadata({
      data: {
        bestSalesProducts: {
          create: buildCreateInput(args.bestSalesProducts)
        }
      }
    });
  },
  
  async upsertNewProducts(parent, args, ctx: Context, info) {
    const buildCreateInput = (products) =>
    products.map((newProduct: OrderableProductInput) => ({
      product: { connect: { id: newProduct.productId } },
      position: newProduct.position
    }));

  if (args.shopMetadataId) {
    const currentShop = await ctx.db.query.shopMetadata({ where: { id: args.shopMetadataId } }, `{ newProducts { id product { id } } }`);

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

    return ctx.db.mutation.updateShopMetadata({
      where: { id: args.shopMetadataId },
      data: { newProducts: {
        delete: productsToDelete,
        create: buildCreateInput(productsToConnect),
        update: productsToUpdate
      }}
    });
  }

  return ctx.db.mutation.createShopMetadata({
    data: {
      bestSalesProducts: {
        create: buildCreateInput(args.bestSalesProducts)
      }
    }
  });
},

  async upsertMOTD(parent, args, ctx: Context, info) {
    if (!ctx.db.exists.ShopMetadata({})) {
      return ctx.db.mutation.createShopMetadata({
        data: { MOTD: args.MOTD }
      });
    }

    return ctx.db.mutation.updateShopMetadata({
      where: { id: args.shopMetadataId },
      data: { MOTD: args.MOTD }
    });
  },
}