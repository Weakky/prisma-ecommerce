import { graphql, compose, withApollo } from 'react-apollo';
import Home from './Home';
import queries from './query.gql';
import commonQueries from '../../graphql/queries';

//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(
  graphql(queries.homeInformation),
  graphql(queries.addOrderToCart, {
    props: ({ mutate }) => ({
      addOrderToCart: ({ orderId, replace }) =>
        mutate({
          variables: { orderId, replace },
          refetchQueries: [{ query: commonQueries.userInformation }],
          // update: (store, { data: { addOrderToCart } }) => {
          //   const data = store.readQuery({ query: commonQueries.userInformation });
          //
          //   console.log(addOrderToCart);
          //
          //   data.me.cart = addOrderToCart;
          //
          //   store.writeQuery({ query: commonQueries.userInformation, data });
          // }
        }),
    }),
  }),
  graphql(queries.updateOneSignalUserId, {
    props: ({ mutate }) => ({
      updateOneSignalUserId: ({ oneSignalUserId }) =>
        mutate({
          variables: { oneSignalUserId },
        }),
    }),
  }),
  withApollo
)(Home);
