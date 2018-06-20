import gql from 'graphql-tag';

import ProductCardFragment from '../../graphql/fragments/ProductCardFragment';

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
          ...ProductCardFragment
        }
      }
    }
  }
  ${ProductCardFragment}
`;
