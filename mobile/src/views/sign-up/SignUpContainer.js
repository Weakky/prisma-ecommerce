import { graphql, compose } from 'react-apollo';
import queries from './query.gql';
import SignUp from './SignUp';

//TODO: Faster mutation by invalidating cache instead of using refetchQueries
export default compose(
  graphql(queries.signUp, {
    props: ({ mutate }) => ({
      signUp: ({ email, password, firstName, lastName, shopId }) =>
        mutate({
          variables: { email, password, firstName, lastName, shopId },
        }),
    }),
  }),
)(SignUp);
