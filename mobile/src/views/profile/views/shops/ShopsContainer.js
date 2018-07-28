import { graphql, compose, withApollo } from 'react-apollo';

import Shops from './Shops';

import queries from './queries.gql';

export default compose(
  graphql(queries.allShopsQuery),
  graphql(queries.updateSelectedShopMutation, {
    props: ({ mutate }) => ({
      updateSelectedShop: ({ selectedShopId }) =>
        mutate({
          variables: { selectedShopId },
          refetchQueries: [
            'dataForBrowsing',
            'filersForCategory'
          ],
        }),
    }),
  }),
  withApollo
)(Shops);
