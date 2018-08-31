import { graphql, compose, withApollo } from 'react-apollo';
import queries from './queries.gql';
import Username from './Username';

export default compose(
  graphql(queries.userIdentityQuery, { options: { fetchPolicy: 'cache-and-network' } }),
  graphql(queries.updateUserIdentityMutation, {
    props: ({ mutate }) => ({
      updateUserIdentity: ({ firstName, lastName }) =>
        mutate({
          variables: { firstName, lastName },
        }),
    }),
  }),
  withApollo,
)(Username);
