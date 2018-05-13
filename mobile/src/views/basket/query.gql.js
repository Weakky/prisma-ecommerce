import gql from 'graphql-tag';

export default gql`
  mutation removeItemFromCart($lineItemId: ID!) {
    removeItemFromCart(lineItemId: $lineItemId) {
      id
    }
  }
`;
