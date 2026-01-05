import { useConfigStore } from '../../stores/configStore';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const TEXTS = {
  placeholder: {
    ko: '서비스 검색',
    en: 'Search services',
  },
  clear: {
    ko: '검색어 지우기',
    en: 'Clear search',
  },
};

export const ServiceSearch = ({ value, onChange }: Props) => {
  const language = useConfigStore((state) => state.language);

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={TEXTS.placeholder[language]}
        aria-label={TEXTS.placeholder[language]}
        className="w-full h-11 pl-10 pr-10 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-400 border border-transparent focus:outline-none focus:border-green-500 transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          aria-label={TEXTS.clear[language]}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
