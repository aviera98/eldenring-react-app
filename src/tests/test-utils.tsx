import { render } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { FavoritesProvider } from '@/context/FavoritesContext';

const Providers = ({ children }: PropsWithChildren) => (
  <FavoritesProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </FavoritesProvider>
);

export const renderWithProviders = (ui: React.ReactElement) => render(ui, { wrapper: Providers });
