import gql from 'graphql-tag';

export default gql`
  query searchProduct($query: String!) {
    searchProducts(productName: $query, first: 6, skip: 0) {
      edges {
        node {
          id
          name
          imageUrl
          displayPrice
          brand {
            id
            name
          }
          unavailableOptionsValues {
            id
            name
          }
        }
      }
    }
  }
`;
