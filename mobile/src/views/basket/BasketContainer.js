import { graphql, compose, withApollo } from 'react-apollo';

import commonQueries from '../../graphql/queries';

import Basket from './Basket';
import queries from './query.gql';

export default compose(
  withApollo,
  graphql(queries.removeItemFromCart, {
    props: ({ mutate }) => ({
      removeItemFromBasket: ({ lineItemId }) =>
        mutate({
          variables: { lineItemId },
          update: store => {
            const data = store.readQuery({ query: commonQueries.userInformation });

            data.me.cart = data.me.cart.filter(lineItem => {
              return lineItem.id !== lineItemId;
            });

            store.writeQuery({ query: commonQueries.userInformation, data });
          },
        }),
    }),
  }),
  graphql(queries.updateLineItemQuantity, {
    props: ({ mutate }) => ({
      updateLineItemQuantity: ({ variantId, quantity }) => (
        mutate({ variables: { variantId, quantity } })
      )
    })
  })
)(Basket);
