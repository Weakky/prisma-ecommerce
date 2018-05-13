import gql from 'graphql-tag';

export default gql`
  subscription subscribeToProductUpdates {
    updatedProduct {
      node {
        id
        available
        unavailableOptionsValues {
          id
          name
        }
      }
    }
  }
`;
