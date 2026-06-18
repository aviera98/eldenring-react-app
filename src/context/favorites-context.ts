import { createContext } from 'react';

import type { FavoriteItem } from '@/types/domain';

export interface FavoritesContextValue {
  addFavorite: (item: FavoriteItem) => void;
  favorites: FavoriteItem[];
  isFavorite: (id: string, category: string) => boolean;
  removeFavorite: (id: string, category: string) => void;
  toggleFavorite: (item: FavoriteItem) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);
