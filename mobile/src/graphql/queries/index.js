import gql from 'graphql-tag';

export default {
  userInformation: gql`
    query userInformation {
      me {
        id
        email
        firstName
        orders { id }
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
