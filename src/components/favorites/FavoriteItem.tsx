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
      className="flex items-center gap-3 px-3 py-4 bg-white cursor-pointer active:bg-gray-50 transition-colors"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${favorite.name} 바로가기`}
    >
      <OptimizedImage
        src={favorite.iconUrl}
        alt={favorite.name}
        width={48}
        height={48}
        className="rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {favorite.name}
        </p>
        <p className="text-xs text-gray-500 truncate">{favorite.url}</p>
      </div>
      <button
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 active:text-red-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        onClick={handleDeleteClick}
        aria-label={`Delete ${favorite.name}`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};
