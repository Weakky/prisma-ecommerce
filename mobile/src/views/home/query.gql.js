import gql from 'graphql-tag';


export default gql`
  query homeInformations {
    me {
      id
      firstName,
      orders {
        id
        lineItems {
          id
          quantity
          variant {
            id
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
        totalPrice
      }
    }
    shopMetadata {
      bestSalesProducts(orderBy: position_ASC) {
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
      newProducts(orderBy: position_ASC) {
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
`;
