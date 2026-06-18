import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { GRAPHQL_API_URL } from '@/constants/app';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Each entity list is cached per filter set so pagination/search state does not bleed
          // across categories or route transitions.
          boss: {
            keyArgs: ['id', 'search'],
          },
          weapon: {
            keyArgs: ['id', 'search'],
          },
          armor: {
            keyArgs: ['id', 'search'],
          },
          item: {
            keyArgs: ['id', 'search'],
          },
          talisman: {
            keyArgs: ['id', 'search'],
          },
          class: {
            keyArgs: ['id', 'search'],
          },
          spirit: {
            keyArgs: ['id', 'search'],
          },
          sorcery: {
            keyArgs: ['id', 'search'],
          },
        },
      },
    },
  }),
  link: new HttpLink({
    // The app consumes only the official Elden Ring GraphQL endpoint.
    uri: GRAPHQL_API_URL,
  }),
  connectToDevTools: import.meta.env.DEV,
});
