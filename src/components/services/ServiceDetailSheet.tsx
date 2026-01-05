import { BottomSheet } from '../common';
import { OptimizedImage } from '../common';
import { useConfigStore } from '../../stores/configStore';
import { useFavoritesStore } from '../../stores/favoritesStore';
import type { Service } from '../../types';

interface Props {
  service: Service | null;
  onClose: () => void;
}

const TEXTS = {
  description: {
    ko: '설명',
    en: 'Description',
  },
  networks: {
    ko: '네트워크',
    en: 'Networks',
  },
  go: {
    ko: '이동',
    en: 'Go',
  },
  addFavorite: {
    ko: '즐겨찾기 추가',
    en: 'Add to Favorites',
  },
  removeFavorite: {
    ko: '즐겨찾기 제거',
    en: 'Remove from Favorites',
  },
};

export const ServiceDetailSheet = ({ service, onClose }: Props) => {
  const language = useConfigStore((state) => state.language);
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  if (!service) return null;

  const isFavorite = favorites.some((f) => f.id === service.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(service.id);
    } else {
      addFavorite({
        id: service.id,
        name: service.name[language],
        url: service.url,
        iconUrl: service.iconUrl,
      });
    }
  };

  const handleGoClick = () => {
    window.open(service.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <BottomSheet isOpen={!!service} onClose={onClose}>
      <div className="px-4 pb-6">
        <div className="flex flex-col items-center pt-2 pb-6">
          <OptimizedImage
            src={service.iconUrl}
            alt={service.name[language]}
            size="xl"
            className="rounded-2xl"
          />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            {service.name[language]}
          </h2>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            {TEXTS.description[language]}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {service.description[language]}
          </p>
        </div>

        {service.networks.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {TEXTS.networks[language]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.networks.map((network) => (
                <span
                  key={network}
                  className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                >
                  {network}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 active:bg-gray-50 transition-colors"
            aria-label={isFavorite ? TEXTS.removeFavorite[language] : TEXTS.addFavorite[language]}
          >
            <svg
              className={`w-5 h-5 ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            {isFavorite ? TEXTS.removeFavorite[language] : TEXTS.addFavorite[language]}
          </button>

          <button
            type="button"
            onClick={handleGoClick}
            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl bg-primary-500 text-sm font-medium text-white active:bg-primary-600 transition-colors"
          >
            {TEXTS.go[language]}
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
