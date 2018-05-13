import gql from 'graphql-tag';

export default gql`
  mutation checkout {
    checkout {
      id
      orderStatus
      totalPrice
      totalRefunded
      totalTax
    }
  }
`
