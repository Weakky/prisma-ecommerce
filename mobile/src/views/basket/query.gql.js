import gql from 'graphql-tag';

export default {
  removeItemFromCart: gql`
    mutation removeItemFromCart($lineItemId: ID!) {
      removeItemFromCart(lineItemId: $lineItemId) {
        id
      }
    }
  `,
  updateLineItemQuantity: gql`
    mutation updateLineItemQuantity($variantId: ID!, $quantity: Int!) {
      addItemToCart(variantId: $variantId, quantity: $quantity) {
        id
        quantity
      }
    }
  `
};
