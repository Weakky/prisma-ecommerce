import { gql } from 'apollo-client-preset';
import ProductCardFragment from '../../../../graphql/fragments/ProductCardFragment'

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
            ...ProductCardFragment
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

export default {
  allShopsQuery,
  updateSelectedShopMutation
}
