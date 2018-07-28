import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import { setupApolloClient } from './src/graphql/setupApollo';

import RootSwitch from './src/routes';

const apolloClient = setupApolloClient();

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <RootSwitch />
      </ApolloProvider>
    );
  }
}
