import { graphql, compose } from 'react-apollo';

import AskPasswordReset from './AskPasswordReset';
import queries from './queries.gql';

export default compose(
  graphql(queries.resetPassword, {
    props: ({ mutate }) => ({
      resetPassword: ({ email }) => (
        mutate({ variables: { email } })
      )
    })
  })
)(AskPasswordReset);
