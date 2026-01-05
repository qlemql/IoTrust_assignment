import { BottomSheet } from '../common';
import { OptimizedImage } from '../common';
import { useConfigStore } from '../../stores/configStore';
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
  go: {
    ko: '이동',
    en: 'Go',
  },
};

export const ServiceDetailSheet = ({ service, onClose }: Props) => {
  const language = useConfigStore((state) => state.language);

  const handleGoClick = () => {
    if (!service) return;
    window.open(service.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <BottomSheet isOpen={!!service} onClose={onClose}>
      {service && (
        <div className="px-4 pb-6">
          <div className="flex items-start gap-4 pt-2 pb-4 justify-start">
            <OptimizedImage
              src={service.iconUrl}
              alt={service.name[language]}
              width={64}
              height={64}
              className="rounded-xl flex-shrink-0"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {service.name[language]}
              </h2>
              {service.networks.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {service.networks.map((network) => (
                    <span
                      key={network}
                      className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded"
                    >
                      {network}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 break-all">
              {service.url}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {TEXTS.description[language]}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {service.description[language]}
            </p>
          </div>

          <div className="fixed bottom-10 left-0 right-0 flex gap-3 justify-center">
            <button
              type="button"
              onClick={handleGoClick}
              className="w-2/3 h-12 flex items-center justify-center gap-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 active:bg-gray-50 transition-colors"
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
      )}
    </BottomSheet>
  );
};
