import { Context, getShopId } from '../../utils';
import * as _ from 'lodash';

export const option = {
  async upsertOption(parent, args, ctx: Context, info) {
    if (args.optionId) {
      const currentOption = await ctx.db.query.option({ where: { id: args.optionId } }, info);

    const optionValuesToDelete = _.differenceBy(currentOption.values, args.values, 'id');
    const optionValuesToDeleteInput = optionValuesToDelete.map(optionValue => ({ id: optionValue.id }))

    const optionValuesToCreate = _(args.values)
      .differenceBy(currentOption.values, 'id')
      .map((optionValue: any) => ({ name: optionValue.value }))
      .value();

    const optionValuesToUpdate = args.values
    .filter(optionValue =>
      !!currentOption.values.find((currentOptionValue) => currentOptionValue.id === optionValue.id)
    )
    .map(optionValue => ({
      where: { id: optionValue.id },
      data: { name: optionValue.value }
    }));

      // Some option values were deleted
      if (args.values.length < currentOption.values.length) {
        // Find all variants that had one of the removed option value
        const variantsToDelete = await Promise.all(
          optionValuesToDelete.map((optionValueToDelete) => (
            ctx.db.query.variants({
              where: { selectedOptions_some: {
                option: { id: args.optionId },
                value: { id: optionValueToDelete.id }
              }}
            }, '{ id }')
          ))
        );
        
        // Remove all the variants and associated selectedOptions
        // /!\ Cascading delete not working with deleteManyType
        await Promise.all(
          optionValuesToDelete.map(optionValueToDelete => (
            ctx.db.mutation.deleteManySelectedOptions({ where: {
              option: { id: args.optionId },
              value: { id: optionValueToDelete.id }
            }})
          ))
        )

        await Promise.all(
          variantsToDelete.map((variantsForOptionValue) => (
            ctx.db.mutation.deleteManyVariants({ where: { id_in: variantsForOptionValue.map(variant => variant.id) }})
          ))
        )
      }

      return ctx.db.mutation.updateOption({
        where: { id: args.optionId },
        data: {
          name: args.name,
          category: { connect: { id: args.categoryId } },
          values: {
            update: optionValuesToUpdate,
            create: optionValuesToCreate,
            delete: optionValuesToDeleteInput
          }
        }
      }, info);
    }

    const shopId = await getShopId(ctx);
    const createValuesInput = args.values.map(optionValue => ({ name: optionValue.value }));

    return ctx.db.mutation.createOption({
      data: {
        name: args.name,
        shop: { connect: { id: shopId } },
        values: { create: createValuesInput },
        category: { connect: { id: args.categoryId } }
      }
    }, info);
  },

  deleteOption(parent, args, ctx: Context, info) {
    return ctx.db.mutation.deleteOption({ where: { id: args.optionId } });
  },
};