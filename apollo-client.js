import { ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://novozybkov.stepzen.net/api/inclined-squirrel/__graphql',
    Headers: {
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`
    },
    cache: new InMemoryCache(),
  });

export default client