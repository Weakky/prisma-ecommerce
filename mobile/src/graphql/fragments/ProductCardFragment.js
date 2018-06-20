import gql from 'graphql-tag';

export default gql`
  fragment ProductCardFragment on Product {
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
`;
