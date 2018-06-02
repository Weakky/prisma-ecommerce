import { Context } from '../../utils';
import * as _ from 'lodash';

export const product = {
  async upsertProduct(parent, args, ctx: Context, info) {
    const optionsToConnect = args.optionIds.map(optionId => ({ id: optionId }));
    const attributesToConnect = args.attributesIds.map(attributeId => ({ id: attributeId }));
    const selectedOptionsForVariantInput = (variant) => variant.selectedOptions.map(selectedOption => ({
      option: { connect: { id: selectedOption.optionId } },
      value: { connect: { id: selectedOption.valueId } }
    }));
    const createVariantsInput = (variants) => variants.map((variant) => ({
      price: variant.price,
      available: variant.available,
      selectedOptions: { create: selectedOptionsForVariantInput(variant) }
    }));

    if (args.productId) {
      const currentProduct = await ctx.db.query.product(
        { where: { id: args.productId } },
        `{
          id
          attributes { id }
          options { id }
          variants { id }
          unavailableOptionsValues { id }
        }`
      );

      let variantsToDisconnect = [];
      // 1. If some variants were removed (eg: an option value were unselected from the product)
      // 2. Soft-delete them and their associated selectedOptions
      // 3. Disconnect them from the product (so we don't have to filter them after)
      // 3. Remark: Ideally, we should only soft-delete the variants that are in orders, and hard-delete the others, but we make it easier this way
      if (currentProduct.variants.length > args.variants.length) {
        // Find the variants to delete
        const variantsToDelete = _.differenceBy(currentProduct.variants, args.variants, 'id');
        const variantsIdsToDelete = variantsToDelete.map(variant => variant.id);
        variantsToDisconnect = variantsIdsToDelete.map(variantId => ({ id: variantId }));
      
        await ctx.db.mutation.updateManySelectedOptions({
          where: {
            variant: {
              id_in: variantsIdsToDelete,
              product: { id: args.productId } }
          },
          data: { deletedAt: new Date().toISOString() }
        }, info);

        await ctx.db.mutation.updateManyVariants({
          where: {
            id_in: variantsIdsToDelete,
            product: { id: args.productId }
          },
          data: { deletedAt: new Date().toISOString() }
        }, info);
      }

      const attributesToDisconnect = _(currentProduct.attributes.map(({ id }) => id ))
        .difference(args.attributesIds)
        .map(attributeId => ({ id: attributeId }))
        .value();

      const optionsToDisconnect = _(currentProduct.options.map(({ id }) => id ))
        .difference(args.optionIds)
        .map(optionId => ({ id: optionId }))
        .value();

      const currentUnavailableOptionsValuesIds = currentProduct.unavailableOptionsValues.map(optionValue => optionValue.id);
      const unavailableOptionsValuesToConnect = _(args.unavailableOptionsValuesIds)
        .differenceBy(currentUnavailableOptionsValuesIds)
        .map(optionValueId => ({ id: optionValueId }))
        .value();
      const unavailableOptionsValuesToDisconnect = _(currentUnavailableOptionsValuesIds)
        .differenceBy(args.unavailableOptionsValuesIds)
        .map(optionValueId => ({ id: optionValueId }))
        .value();
      
      const variantsToCreate = _.differenceBy(args.variants, currentProduct.variants, 'id');
      const variantsToUpdate = args.variants
      .filter((variant /* ProductVariantInput */) =>
        !!currentProduct.variants.find((currentVariant) => currentVariant.id === variant.id)
      )
      .map(variant => ({
        where: { id: variant.id },
        data: {
          available: variant.available,
          price: variant.price
        }
      }));

      return ctx.db.mutation.updateProduct({
        where: { id: args.productId },
        data: {
          name: args.name,
          category: { connect: { id: args.categoryId } },
          brand: { connect: { id: args.brandId } },
          attributes: {
            connect: attributesToConnect,
            disconnect: attributesToDisconnect
          },
          options: {
            connect: optionsToConnect,
            disconnect: optionsToDisconnect
          },
          unavailableOptionsValues: {
            disconnect: unavailableOptionsValuesToDisconnect,
            connect: unavailableOptionsValuesToConnect,
          },
          description: "",
          displayPrice: args.displayPrice,
          available: true,
          SKU: "",
          variants: {
            update: variantsToUpdate,
            create: createVariantsInput(variantsToCreate),
            disconnect: variantsToDisconnect
          },
          imageUrl: args.imageUrl
        }
      }, info);
    }
    
    return ctx.db.mutation.createProduct({
      data: {
        name: args.name,
        category: { connect: { id: args.categoryId } },
        brand: { connect: { id: args.brandId } },
        options: { connect: optionsToConnect },
        description: "",
        displayPrice: args.displayPrice,
        available: true,
        SKU: "",
        attributes: { connect: attributesToConnect },
        variants: { create: createVariantsInput(args.variants) },
        imageUrl: args.imageUrl
      }
    }, info);
  },

  async deleteProduct(parent, args, ctx: Context, info) {
    // If product is in some user's cart
    // Disconnect it from the carts
    const usersWithProductInCart = await ctx.db.query.users({
      where: {
        cart_some: {
          variant: {
            product: { id: args.productId }
          }
        }
      }
    }, `{ id }`);
    
    if (usersWithProductInCart.length > 0) {
      const usersToDisconnectIds = usersWithProductInCart.map((user) => user.id);

      await ctx.db.mutation.deleteManyOrderLineItems({
        where: {
          owner: { id_in: usersToDisconnectIds },
          variant: {
            product: { id: args.productId }
          }
        },
      });
  }

    // If product is in some orders, then soft-delete the product
    if (await ctx.db.exists.Order({
      lineItems_some: {
        variant: {
          product: { id: args.productId }
        }
      }
    })) {
      //Still delete the new/best-sellers products.
      await ctx.db.mutation.deleteManyOrderableProducts({ where: { product: { id: args.productId } } });

      return ctx.db.mutation.updateProduct({
        where: { id: args.productId },
        data: { deletedAt: new Date().toISOString()}
      });
    }
    
    return ctx.db.mutation.deleteProduct({ where: { id: args.productId } });
  },
}
