import type { Service } from '../../types';
import { useConfigStore } from '../../stores/configStore';
import { OptimizedImage } from '../common';

interface Props {
  service: Service;
  onSelect: (service: Service) => void;
}

export const ServiceItem = ({ service, onSelect }: Props) => {
  const language = useConfigStore((state) => state.language);

  const handleClick = () => {
    onSelect(service);
  };

  return (
    <div className="bg-white">
      <div
        className="flex items-center gap-3 px-3 py-3 cursor-pointer active:bg-gray-50 transition-colors overflow-hidden"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        <OptimizedImage
          src={service.iconUrl}
          alt={service.name[language]}
          width={48}
          height={48}
          className="rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-sm font-medium text-gray-900 truncate">
            {service.name[language]}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {service.description[language]}
          </p>
        </div>
      </div>
      <div className="py-2 px-3">
        <div className="border-b border-gray-200" />
      </div>
    </div>
  );
};
