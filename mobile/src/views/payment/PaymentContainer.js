import { graphql, compose } from 'react-apollo';

import Payment from './Payment';
import queries from './query.gql';

export default compose(
  graphql(queries.orderStatuses, {
    name: 'orderStatuses',
    props: (props) => ({
      ...props,
      waitFor3DSecure: ({ orderId }) => {
        return props.orderStatuses.subscribeToMore({
          document: queries.waitFor3DSecure,
          variables: { orderId },
          updateQuery: (prev, { subscriptionData }) => {
            const updatedOrder = subscriptionData.data.waitFor3DSecure.node;

            return {
              ...prev,
              me: {
                ...prev.me,
                cart: updatedOrder.orderStatus === 'PAID' ? [] : prev.me.cart,
                orders: prev.me.orders.map((order) => {
                  if (order.id !== updatedOrder.id) { return order }

                  return {
                    ...order,
                    orderStatus: updatedOrder.orderStatus,
                  }
                })
              }
            }
          }
        })
      }
    })
  }),
  graphql(queries.pay, {
    props: ({ mutate }) => ({
      pay: ({ stripeTokenId }) =>
        mutate({
          variables: { stripeTokenId },
          update: (store, { data: { pay } }) => {
            const data = store.readQuery({ query: queries.orderStatuses });

            if (pay.order.orderStatus === 'PAID') {
              data.me.cart = [];
            }

            data.me.orders.push(pay.order);

            store.writeQuery({ query: queries.orderStatuses, data });
          },
        }),
    }),
  })
)(Payment);
