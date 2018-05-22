import gql from 'graphql-tag';

export default gql`
  query dataForBrowsing {
    categories: allCategories {
      id
      name
    }
  }
`;
