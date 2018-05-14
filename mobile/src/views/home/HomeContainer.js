import { graphql } from 'react-apollo';
import Home from './Home';
import query from './query.gql';

export default graphql(query)(Home);
