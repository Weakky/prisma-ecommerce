import gql from 'graphql-tag';

const productCardFragment = gql`
  fragment ProductCardFragment on Product {
    id
    name
    available
    imageUrl
    displayPrice
    unavailableOptionsValues {
      id
      name
    }
    brand {
      id
      name
    }
  }
`;

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
  ${productCardFragment}
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
  ${productCardFragment}
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
