import { createError } from 'apollo-errors';

const exceptions = {
  orderLineItemNotFound: {
    message: "Line item doesn't exist anymore.",
    code: 100,
  },
  productNotFound: {
    message: "Product doesn't exist anymore.",
    code: 101,
  },
  orderNotFound: {
    message: "Order doesn't exist.",
    code: 102,
  },
  productOrVariantNotFound: {
    message: "A product or a variant of your cart doesn't exist anymore",
    code: 103,
  },
  orderNotSentToCurrentShop: {
    message: "The order wasn't sent to your configured shop",
    code: 104,
  },
  invalidEmail: {
    message: 'Invalid email',
    code: 200,
  },
  invalidPassword: {
    message: 'Invalid password.',
    code: 201,
  },
  invalidOldPassword: {
    message: 'Invalid old password.',
    code: 202,
  },
};

export const OrderLineItemNotFoundException = createError('OrderLineItemNotFound', {
  message: exceptions.orderLineItemNotFound.message,
  data: { code: exceptions.orderLineItemNotFound.code },
});

export const ProductNotFoundException = createError('ProductNotFound', {
  message: exceptions.productNotFound.message,
  data: { code: exceptions.productNotFound.code },
});

export const OrderNotFoundException = createError('OrderNotFound', {
  message: exceptions.orderNotFound.message,
  data: { code: exceptions.orderNotFound.code },
});

export const ProductOrVariantNotFoundException = (deletedVariants, deletedProducts) =>
  createError('ProductOrVariantNotFound', {
    message: exceptions.productOrVariantNotFound.message,
    data: {
      code: exceptions.productOrVariantNotFound.code,
      deletedVariants,
      deletedProducts,
    },
  });

export const OrderNotSentToCurrentShopException = createError(
  'OrderNotSentToCurrentShop',
  {
    message: exceptions.orderNotSentToCurrentShop.message,
    data: { code: exceptions.orderNotSentToCurrentShop.code },
  },
);

export const InvalidEmailException = createError('InvalidEmail', {
  message: exceptions.invalidEmail.message,
  data: { code: exceptions.invalidEmail.code },
});

export const InvalidPasswordException = createError('InvalidPassword', {
  message: exceptions.invalidPassword.message,
  data: { code: exceptions.invalidPassword.code },
});

export const InvalidOldPasswordException = createError('InvalidOldPassword', {
  message: exceptions.invalidOldPassword.message,
  data: { code: exceptions.invalidOldPassword.code },
});
