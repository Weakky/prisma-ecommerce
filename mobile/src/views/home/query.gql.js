import gql from 'graphql-tag';

const homeInformation = gql`
  query homeInformation {
    me {
      id
      firstName
      oneSignalUserId
      cart {
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
        }
      }
      orders(first: 1, orderBy: createdAt_DESC) {
        id
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
      selectedShop {
        id
        MOTD
        bestSellerProducts(orderBy: position_ASC, first: 5) {
          id
          product {
            id
            name
            displayPrice
            imageUrl
            brand {
              id
              name
            }
            unavailableOptionsValues {
              id
              name
            }
          }
        }
        newProducts(orderBy: position_ASC, first: 5) {
          id
          product {
            id
            name
            displayPrice
            imageUrl
            brand {
              id
              name
            }
            unavailableOptionsValues {
              id
              name
            }
          }
        }
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
  },
`;

const updateOneSignalUserId = gql`
  mutation updateOneSignalUserId($oneSignalUserId: String!) {
    updateUser(oneSignalUserId: $oneSignalUserId) {
      id
      oneSignalUserId
    }
  }
`;

export default {
  homeInformation,
  addOrderToCart,
  updateOneSignalUserId,
};
