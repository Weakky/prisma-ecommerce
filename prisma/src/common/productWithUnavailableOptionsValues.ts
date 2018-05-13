import * as _ from 'lodash';
import { Variant, Option, OptionValue, SelectedOption } from '../generated/prisma';

const findUnavailableOptionsValues = (variants: Variant[], options: Option[]) => {

  const isOptionValueInSelectedOptions = (selectedOptions: SelectedOption[], optionValue: OptionValue) => {
    return !!selectedOptions.find(selectedOption => selectedOption.value.id === optionValue.id);
  }

  const isInAllUnavailableVariants = (variants: Variant[], optionValue: OptionValue) => {
    return variants
      // Get all variants in which the option value is
      .filter(variant => isOptionValueInSelectedOptions(variant.selectedOptions, optionValue))
      // Make sure those variants are all unavailable
      .every(variant => !variant.available);
  }

  return _(options)
    .flatMap(option => option.values)
    .filter((optionValue: OptionValue) => isInAllUnavailableVariants(variants, optionValue))
    .value();
}

export const buildProductWithUnavailableOptionsValues = (product) => {
  return {
    id: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    displayPrice: product.displayPrice,
    brand: product.brand,
    unavailableOptionsValues: findUnavailableOptionsValues(product.variants, product.options)
  }
}