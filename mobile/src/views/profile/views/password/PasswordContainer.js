import { graphql, compose, withApollo } from 'react-apollo';
import query from './query.gql';
import Password from './Password';

export default compose(
  graphql(query.changePasswordMutation, {
    props: ({ mutate }) => ({
      changePassword: ({ oldPassword, newPassword }) =>
        mutate({
          variables: { oldPassword, newPassword },
        }),
    }),
  }),
  withApollo,
)(Password);
