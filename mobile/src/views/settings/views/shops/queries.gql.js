import { gql } from 'apollo-client-preset';

const allShopsQuery = gql`
  query shops {
    allShops {
      id
      name
      address
      zipCode
      city
      phoneNumber
      openingHours
    }
    me {
      id
      selectedShop {
        id
        name
        address
        zipCode
        city
        phoneNumber
        openingHours
      }
    }
  }
`;

const updateSelectedShopMutation = gql`
  mutation updateSelectedShop($selectedShopId: ID!) {
    updateUser(selectedShopId: $selectedShopId) {
      id
      firstName
      cart {
        id
        deletedAt
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

export default {
  allShopsQuery,
  updateSelectedShopMutation
}
