import gql from 'graphql-tag';

export default {
  signUp: gql`
    mutation signUp($email: String!, $password: String!, $firstName: String!, $lastName: String!, $shopId: ID!) {
      signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName, shopId: $shopId) {
        token
      }
    }
  `
}
