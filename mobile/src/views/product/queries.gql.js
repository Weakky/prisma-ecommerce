import gql from 'graphql-tag';

export default {
  queryProductInfo: gql`
    query product($productId: ID!, $nullValue: DateTime) {
      product(id: $productId) {
        id
        name
        description
        available
        imageUrl
        displayPrice
        brand {
          id
          name
        }
        options {
          id
          name
          values {
            id
            name
          }
        }
        variants(where: { deletedAt: $nullValue }) {
          id
          available
          price
          selectedOptions {
            id
            option {
              id
              name
            }
            value {
              id
              name
            }
          }
        }
      }
    }
  `,
  addItemToCart: gql`
    mutation addItemToCart($variantId: ID!, $quantity: Int!) {
      addItemToCart(variantId: $variantId, quantity: $quantity) {
        id
        quantity
        variant {
          id
        }
      }
    }
  `,
};
