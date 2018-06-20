import gql from 'graphql-tag';

export default {
  userInformation: gql`
    query userInformation {
      me {
        id
        email
        oneSignalUserId
        firstName
        orders {
          id
        }
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
              available
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
    }
  `,
};
