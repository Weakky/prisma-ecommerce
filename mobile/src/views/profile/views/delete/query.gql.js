import gql from 'graphql-tag';

const deleteAccountMutation = gql`
  mutation deleteAccount($password: String!) {
    deleteAccount(password: $password) {
      id
    }
  }
`;

export default {
  deleteAccountMutation,
};
