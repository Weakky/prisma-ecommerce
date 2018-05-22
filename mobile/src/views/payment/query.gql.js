import gql from 'graphql-tag';

export default {
  pay: gql`
    mutation pay($stripeTokenId: String!) {
      pay(stripeTokenId: $stripeTokenId) {
        redirectUrl
        order {
          id
          createdAt
          orderStatus
        }
      }
    }
  `,
  orderStatuses: gql`
    query orderStatuses {
      me {
        id
        cart {
          id
        }
        orders(orderBy: createdAt_ASC) {
          id
          createdAt
          orderStatus
        }
      }
    }
  `,
  waitFor3DSecure: gql`
    subscription waitFor3DSecure($orderId: ID!) {
      waitFor3DSecure(orderId: $orderId) {
        node {
          id
          createdAt
          orderStatus
        }
      }
    }
  `,
};
