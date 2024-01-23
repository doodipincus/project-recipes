import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Router from './router';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
// import { automaticSignIn } from './utils/automaticSignIn';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  const httpLink = createHttpLink({
    uri: `http://localhost:3000/graphql`,
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  // automaticSignIn()


  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </QueryClientProvider>
  );
}
