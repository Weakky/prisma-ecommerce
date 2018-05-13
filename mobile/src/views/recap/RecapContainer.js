import { graphql, compose } from 'react-apollo';

import commonQueries from '../../graphql/queries'

import Recap from './Recap';
import query from './query.gql';

export default compose(
  graphql(query, {
    props: ({ mutate }) => ({
      checkout: () =>
        mutate({
          update: (store) => {
            const data = store.readQuery({ query: commonQueries.userInformation });

            data.me.cart = [];
            //TODO: add order to user orders

            store.writeQuery({ query: commonQueries.userInformation, data });
          },
        }),
    }),
  }),
)(Recap);
