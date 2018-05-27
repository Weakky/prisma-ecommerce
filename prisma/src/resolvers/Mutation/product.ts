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
          attributes { id }
          options { id }
          variants { id }
          unavailableOptionsValues { id }
        }`
      );

      // If some variants were deleted
      if (currentProduct.variants.length < args.variants) {
        //Delete those variants and their associated selectedOptions (cascading deletes isn't working with deleteMany)
        const variantsToDelete = _.differenceBy(currentProduct.variants, args.variants, 'id');
        const variantsIdsToDelete = variantsToDelete.map(variant => variant.id);
        
        await ctx.db.mutation.deleteManySelectedOptions({
          where: {
            variant: {
              id_in: variantsIdsToDelete,
              product: { id: args.productId } }
          }
        }, info);
        await ctx.db.mutation.deleteManyVariants({
          where: {
            id_in: variantsIdsToDelete,
            product: { id: args.productId }
          }
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

      // Disconnect/Reconnect all unavailableOptionsValues everytime for convenience
      const unavailableOptionsValuesToDisconnect = currentProduct.unavailableOptionsValues.map(optionValue => ({ id: optionValue.id }));
      const unavailableOptionsValuesToConnect = args.unavailableOptionsValuesIds.map(optionValueId => ({ id: optionValueId }));

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
            connect: unavailableOptionsValuesToConnect,
            disconnect: unavailableOptionsValuesToDisconnect,
          },
          description: "",
          displayPrice: args.displayPrice,
          available: true,
          SKU: "",
          variants: {
            update: variantsToUpdate,
            create: createVariantsInput(variantsToCreate)
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
