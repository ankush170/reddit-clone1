import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://novozybkov.stepzen.net/api/inclined-squirrel/__graphql',
    Headers: {
        Authorization: `APIKey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`
    },
    cache: new InMemoryCache(),
  });

export default client