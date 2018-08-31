import gql from 'graphql-tag';

const changePasswordMutation = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`;

export default {
  changePasswordMutation,
};
