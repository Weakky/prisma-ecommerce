import { AsyncStorage } from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from 'apollo-utilities';

import StorageKeys from '../statics/storage-keys';

let cachedToken = '';

async function getAuthorizationToken() {
  const token = cachedToken
    ? cachedToken
    : await AsyncStorage.getItem(StorageKeys.GC_TOKEN);

  cachedToken = token;

  return token;
}

export function setupApolloClient() {

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/',
    options: {
      reconnect: true,
    },
  });
  
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/',
  });

  const authMiddleware = setContext((_, { headers }) => new Promise(async (resolve) => {

    // get the authentication token from local storage if it exists
    const token = await getAuthorizationToken();

    cachedToken = token;

    // return the headers to the context so httpLink can read them
    resolve({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      }
    })
  }));

  const httpLinkWithAuth = authMiddleware.concat(httpLink);

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLinkWithAuth
  );
  
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache({ dataIdFromObject: o => o.id }),
    connectToDevTools: true
  });

  return client;
}
