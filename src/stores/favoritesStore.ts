import { create } from 'zustand';
import type { FavoritesState } from '../types';
import { initialFavorites } from '../mocks/favorites';

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: initialFavorites,
  addFavorite: (favorite) =>
    set((state) => ({
      favorites: [...state.favorites, favorite],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f.id !== id),
    })),
}));
