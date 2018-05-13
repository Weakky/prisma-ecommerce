import gql from 'graphql-tag';

export default {
  userInformation: gql`
    query userInformation {
      me {
        id
        email
        firstName
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
            product {
              id
              name
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
          }
        }
      }
    }
  `,
};
