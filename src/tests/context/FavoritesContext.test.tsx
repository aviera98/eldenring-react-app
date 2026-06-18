import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { useFavorites } from '@/hooks/useFavorites';
import { renderWithProviders } from '@/tests/test-utils';

const DemoFavorites = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          toggleFavorite({
            category: 'bosses',
            categoryLabel: 'Bosses',
            id: 'boss-1',
            image: null,
            name: 'Malenia',
          });
        }}
      >
        Toggle favorite
      </button>
      <p>Count: {favorites.length}</p>
      <p>Has favorite: {String(isFavorite('boss-1', 'bosses'))}</p>
    </div>
  );
};

describe('FavoritesContext', () => {
  it('adds and removes favorites while keeping lookup state in sync', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DemoFavorites />);

    const button = screen.getByRole('button', { name: /toggle favorite/i });

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    expect(screen.getByText('Has favorite: false')).toBeInTheDocument();

    await user.click(button);

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
    expect(screen.getByText('Has favorite: true')).toBeInTheDocument();

    await user.click(button);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    expect(screen.getByText('Has favorite: false')).toBeInTheDocument();
  });
});
