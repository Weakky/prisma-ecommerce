import gql from 'graphql-tag';

export default {
  authenticateUser: gql`
    mutation authenticatedUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          id
          selectedShop { id }
          email
          oneSignalUserId
          firstName
          lastName
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
        }
        token
      }
    }
  `,
};
