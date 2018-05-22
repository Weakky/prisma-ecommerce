import { graphql } from 'react-apollo';
import query from './query.gql';

import Browse from './Browse';

export default graphql(query)(Browse);
