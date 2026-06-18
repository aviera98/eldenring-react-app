import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import { apolloClient } from '@/api/apolloClient';
import { ROUTER_BASENAME } from '@/constants/app';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { AppRouter } from '@/routes/AppRouter';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <FavoritesProvider>
      <BrowserRouter basename={ROUTER_BASENAME}>
        <AppRouter />
      </BrowserRouter>
    </FavoritesProvider>
  </ApolloProvider>
);

export default App;
