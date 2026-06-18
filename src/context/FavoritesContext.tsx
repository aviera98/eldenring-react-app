import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { FAVORITES_STORAGE_KEY } from '@/constants/storage';
import { FavoritesContext } from '@/context/favorites-context';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { FavoriteItem } from '@/types/domain';

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(FAVORITES_STORAGE_KEY, []);
  const [indexedIds, setIndexedIds] = useState<Set<string>>(
    () => new Set(favorites.map((favorite) => `${favorite.category}:${favorite.id}`)),
  );

  const syncFavorites = useCallback(
    (nextFavorites: FavoriteItem[]) => {
      // We keep both the serialized list and an indexed set so reads stay O(1)
      // while persistence remains straightforward.
      setFavorites(nextFavorites);
      setIndexedIds(
        new Set(nextFavorites.map((favorite) => `${favorite.category}:${favorite.id}`)),
      );
    },
    [setFavorites],
  );

  const addFavorite = useCallback(
    (item: FavoriteItem) => {
      syncFavorites(
        favorites.some((favorite) => favorite.id === item.id && favorite.category === item.category)
          ? favorites
          : [item, ...favorites],
      );
    },
    [favorites, syncFavorites],
  );

  const removeFavorite = useCallback(
    (id: string, category: string) => {
      syncFavorites(
        favorites.filter((favorite) => !(favorite.id === id && favorite.category === category)),
      );
    },
    [favorites, syncFavorites],
  );

  const isFavorite = useCallback(
    (id: string, category: string) => indexedIds.has(`${category}:${id}`),
    [indexedIds],
  );

  const toggleFavorite = useCallback(
    (item: FavoriteItem) => {
      if (indexedIds.has(`${item.category}:${item.id}`)) {
        removeFavorite(item.id, item.category);

        return;
      }

      addFavorite(item);
    },
    [addFavorite, indexedIds, removeFavorite],
  );

  const value = useMemo(
    () => ({
      addFavorite,
      favorites,
      isFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [addFavorite, favorites, isFavorite, removeFavorite, toggleFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
