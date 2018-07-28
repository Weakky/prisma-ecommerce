import { graphql, compose, withApollo } from 'react-apollo';
import queries from './query.gql';
import commonQueries from '../../../../graphql/queries';
import Orders from './Orders';

//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(
  graphql(queries.userOrders, { options: { fetchPolicy: 'cache-and-network' } }),
  graphql(queries.addOrderToCart, {
    props: ({ mutate }) => ({
      addOrderToCart: ({ orderId, replace }) =>
        mutate({
          variables: { orderId, replace },
          refetchQueries: [{ query: commonQueries.userInformation }],
        }),
    }),
  }),
  withApollo,
)(Orders);
