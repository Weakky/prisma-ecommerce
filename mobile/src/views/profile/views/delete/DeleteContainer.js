import { graphql, compose, withApollo } from 'react-apollo';
import query from './query.gql';
import Delete from './Delete';

export default compose(
  graphql(query.deleteAccountMutation, {
    props: ({ mutate }) => ({
      deleteAccount: ({ password }) =>
        mutate({
          variables: { password },
        }),
    }),
  }),
  withApollo,
)(Delete);
