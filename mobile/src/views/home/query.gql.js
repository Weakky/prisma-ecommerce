import gql from 'graphql-tag';
import ProductCardFragment from '../../graphql/fragments/ProductCardFragment'

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
            ...ProductCardFragment
          }
        }
        newProducts(orderBy: position_ASC, first: 5) {
          id
          product {
            ...ProductCardFragment
          }
        }
      }
    }
  }
  ${ProductCardFragment}
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
          ...ProductCardFragment
        }
      }
    }
  }
  ${ProductCardFragment}
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
