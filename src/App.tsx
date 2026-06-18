import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import { apolloClient } from '@/api/apolloClient';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { AppRouter } from '@/routes/AppRouter';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <FavoritesProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </FavoritesProvider>
  </ApolloProvider>
);

export default App;
