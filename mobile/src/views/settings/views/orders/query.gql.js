import gql from 'graphql-tag';

const userOrders = gql`
  query userOrders {
    me {
      id
      cart(first: 1) {
        id
      }
      orders(orderBy: createdAt_DESC) {
        id
        receiver { id }
        createdAt
        lineItems {
          id
          quantity
          variant {
            id
            price
            product {
              id
              name
            }
            selectedOptions {
              id
              value {
                id
                name
              }
            }
          }
        }
        totalPrice
      }
    }
  }
`;

const addOrderToCart = gql`
  mutation addOrderToCart($orderId: ID!, $replace: Boolean!) {
    addOrderToCart(orderId: $orderId, replace: $replace) {
      id
      quantity
      variant {
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
        product {
          id
          name
          imageUrl
          unavailableOptionsValues {
            id
            name
          }
          brand {
            id
            name
          }
        }
      }
    }
  }
`;

export default {
  userOrders,
  addOrderToCart,
};
