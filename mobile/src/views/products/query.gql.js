import gql from 'graphql-tag';

export default gql`
  query productsWithFilters(
    $brandsIds: [ID!]!
    $attributesIds: [ID!]!
    $optionsValuesIds: [ID!]!
    $categoryId: ID!
    $first: Int!
    $skip: Int!
  ) {
    products: searchProducts(
      brandsIds: $brandsIds
      attributesIds: $attributesIds
      optionsValuesIds: $optionsValuesIds
      categoryId: $categoryId
      first: $first
      skip: $skip
    ) {
      aggregate {
        count
      }
      edges {
        node {
          id
          name
          available
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
