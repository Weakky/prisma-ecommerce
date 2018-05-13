import { graphql, compose, withApollo } from 'react-apollo';

import SignIn from './SignIn';
import queries from './queries.gql';

export default compose(
  withApollo,
  graphql(queries.authenticateUser, {
    props: ({ mutate }) => ({
      authenticateUser: ({ email, password }) =>
        mutate({
          variables: { email, password },
        }),
    }),
  }),
)(SignIn);
