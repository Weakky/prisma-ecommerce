import { createError } from "apollo-errors";

const exceptions = {
  orderLineItemNotFound: {
    message: 'Line item doesn\'t exist anymore.',
    code: 100
  },
  productNotFound: {
    message: 'Product doesn\'t exist anymore.',
    code: 101
  },
  orderNotFound: {
    message: 'Order doesn\'t exist.',
    code: 102
  },
  productOrVariantNotFound: {
    message: 'A product or a variant of your cart doesn\'t exist anymore',
    code: 103
  }
}

export const OrderLineItemNotFoundException = createError('OrderLineItemNotFound', {
  message: exceptions.orderLineItemNotFound.message,
  data: { code: exceptions.orderLineItemNotFound.code }
});

export const ProductNotFoundException = createError('ProductNotFound', {
  message: exceptions.productNotFound.message,
  data: { code: exceptions.productNotFound.code }
});

export const OrderNotFoundException = createError('OrderNotFound', {
  message: exceptions.orderNotFound.message,
  data: { code: exceptions.orderNotFound.code }
});

export const ProductOrVariantNotFoundException = (deletedVariants, deletedProducts) => createError('ProductOrVariantNotFound', {
  message: exceptions.productOrVariantNotFound.message,
   data: {
     code: exceptions.productOrVariantNotFound.code,
     deletedVariants,
     deletedProducts
   }
});

