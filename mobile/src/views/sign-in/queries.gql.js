import gql from 'graphql-tag';

export default {
  authenticateUser: gql`
    mutation authenticatedUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `,
};
