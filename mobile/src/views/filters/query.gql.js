import gql from 'graphql-tag';

export default gql`
  query filersForCategory($categoryId: ID) {
    brands: allBrands(categoryId: $categoryId) {
      id
      name
    }
    attributes: allAttributes(categoryId: $categoryId) {
      id
      value
    }
    options: allOptions(categoryId: $categoryId) {
      id
      name
      values {
        id
        name
      }
    }
    categories: allCategories {
      id
      name
    }
  }
`;
