import gql from 'graphql-tag';

const userIdentityQuery = gql`
  query userIdentity {
    me {
      id
      firstName
      lastName
    }
  }
`;

const updateUserIdentityMutation = gql`
  mutation updateUser($firstName: String!, $lastName: String!) {
    updateUser(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export default {
  userIdentityQuery,
  updateUserIdentityMutation,
};
