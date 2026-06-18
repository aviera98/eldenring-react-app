import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FavoritesProvider } from '@/context/FavoritesContext';
import { useFavorites } from '@/hooks/useFavorites';

describe('useFavorites', () => {
  it('throws outside provider boundaries', () => {
    expect(() => renderHook(() => useFavorites())).toThrow(/FavoritesProvider/i);
  });

  it('exposes the favorites API inside the provider', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: ({ children }) => <FavoritesProvider>{children}</FavoritesProvider>,
    });

    act(() => {
      result.current.addFavorite({
        category: 'items',
        categoryLabel: 'Items',
        id: 'flask-1',
        image: null,
        name: 'Flask of Crimson Tears',
      });
    });

    expect(result.current.isFavorite('flask-1', 'items')).toBe(true);
    expect(result.current.favorites).toHaveLength(1);
  });
});
