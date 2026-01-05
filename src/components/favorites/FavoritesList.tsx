import { useState } from 'react';
import { useConfigStore } from '../../stores/configStore';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { FavoriteItem } from './FavoriteItem';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { FavoritesSkeleton } from './FavoritesSkeleton';

interface Props {
  isLoading?: boolean;
}

const TEXTS = {
  title: {
    ko: '즐겨찾기',
    en: 'Favorites',
  },
  empty: {
    ko: '즐겨찾기가 없습니다',
    en: 'No favorites yet',
  },
};

export const FavoritesList = ({ isLoading = false }: Props) => {
  const language = useConfigStore((state) => state.language);
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDeleteRequest = (id: string) => {
    const target = favorites.find((f) => f.id === id);
    if (target) {
      setDeleteTarget({ id: target.id, name: target.name });
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      removeFavorite(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleCloseSheet = () => {
    setDeleteTarget(null);
  };

  return (
    <section className="px-4">
      <h2 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-200">
        {TEXTS.title[language]}
      </h2>

      {isLoading ? (
        <FavoritesSkeleton />
      ) : favorites.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-gray-500">{TEXTS.empty[language]}</p>
        </div>
      ) : (
        <div>
          {favorites.map((favorite, index) => (
            <div key={favorite.id}>
              <FavoriteItem
                favorite={favorite}
                onDelete={handleDeleteRequest}
              />
              {index < favorites.length - 1 && (
                <div className="py-2">
                  <div className="border-b border-gray-200" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        onClose={handleCloseSheet}
        onConfirm={handleDeleteConfirm}
        favoriteName={deleteTarget?.name ?? ''}
      />
    </section>
  );
};
