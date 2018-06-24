import gql from 'graphql-tag';

export default {
  resetPassword: gql`
    mutation resetPassword($email: String!) {
      resetPassword(email: $email) {
        mailMaybeSent
      }
    }
  `
};
