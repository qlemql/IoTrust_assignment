import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritesStore } from './favoritesStore';
import type { Favorite } from '../types';

describe('favoritesStore', () => {
  const mockFavorite: Favorite = {
    id: 'test-fav-1',
    name: 'Test Service',
    url: 'https://test.com',
    iconUrl: 'https://test.com/icon.png',
  };

  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] });
  });

  it('초기 상태는 빈 배열이어야 한다', () => {
    const { favorites } = useFavoritesStore.getState();

    expect(favorites).toEqual([]);
  });

  it('addFavorite로 즐겨찾기를 추가할 수 있어야 한다', () => {
    const { addFavorite } = useFavoritesStore.getState();

    addFavorite(mockFavorite);

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(1);
    expect(favorites[0]).toEqual(mockFavorite);
  });

  it('removeFavorite로 즐겨찾기를 삭제할 수 있어야 한다', () => {
    useFavoritesStore.setState({ favorites: [mockFavorite] });

    const { removeFavorite } = useFavoritesStore.getState();
    removeFavorite(mockFavorite.id);

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(0);
  });

  it('여러 즐겨찾기를 추가할 수 있어야 한다', () => {
    const { addFavorite } = useFavoritesStore.getState();

    const favorite2: Favorite = {
      id: 'test-fav-2',
      name: 'Test Service 2',
      url: 'https://test2.com',
      iconUrl: 'https://test2.com/icon.png',
    };

    addFavorite(mockFavorite);
    addFavorite(favorite2);

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(2);
  });

  it('존재하지 않는 ID로 삭제해도 에러가 발생하지 않아야 한다', () => {
    useFavoritesStore.setState({ favorites: [mockFavorite] });

    const { removeFavorite } = useFavoritesStore.getState();
    removeFavorite('non-existent-id');

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(1);
  });

  it('특정 즐겨찾기만 삭제되어야 한다', () => {
    const favorite2: Favorite = {
      id: 'test-fav-2',
      name: 'Test Service 2',
      url: 'https://test2.com',
      iconUrl: 'https://test2.com/icon.png',
    };

    useFavoritesStore.setState({ favorites: [mockFavorite, favorite2] });

    const { removeFavorite } = useFavoritesStore.getState();
    removeFavorite(mockFavorite.id);

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(1);
    expect(favorites[0].id).toBe('test-fav-2');
  });

  it('중복 ID로 추가하면 두 개가 모두 저장되어야 한다 (현재 동작)', () => {
    const { addFavorite } = useFavoritesStore.getState();
    const duplicateFavorite: Favorite = {
      ...mockFavorite,
      name: 'Duplicate Name',
    };

    addFavorite(mockFavorite);
    addFavorite(duplicateFavorite);

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(2);
  });

  it('빈 배열에서 삭제해도 에러가 발생하지 않아야 한다', () => {
    const { removeFavorite } = useFavoritesStore.getState();

    expect(() => removeFavorite('any-id')).not.toThrow();

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toEqual([]);
  });
});
