import type { Favorite } from '../../types';
import { OptimizedImage } from '../common';

interface Props {
  favorite: Favorite;
  onDelete: (id: string) => void;
}

export const FavoriteItem = ({ favorite, onDelete }: Props) => {
  const handleClick = () => {
    window.open(favorite.url, '_blank', 'noopener,noreferrer');
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(favorite.id);
  };

  return (
    <div
      className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer active:bg-gray-50 transition-colors"
      onClick={handleClick}
    >
      <OptimizedImage
        src={favorite.iconUrl}
        alt={favorite.name}
        size="md"
        className="rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {favorite.name}
        </p>
        <p className="text-xs text-gray-500 truncate">{favorite.url}</p>
      </div>
      <button
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        onClick={handleDeleteClick}
        aria-label={`Delete ${favorite.name}`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
