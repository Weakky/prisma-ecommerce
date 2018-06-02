import { createError } from "apollo-errors";

const exceptions = {
  orderLineItemNotFound: {
    message: 'Line item doesn\'t exist anymore.',
    code: 100
  },
  productNotFound: {
    message: 'Product doesn\'t exist anymore.',
    code: 101
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