import gql from 'graphql-tag';

export default gql`
  subscription subscribeToProductUpdates {
    updatedProduct {
      id
      available
      unavailableOptionsValues {
        id
        name
      }
    }
  }
`;
