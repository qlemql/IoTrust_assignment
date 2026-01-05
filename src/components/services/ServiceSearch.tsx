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
        className="w-full h-11 pl-10 pr-4 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-400 border border-transparent focus:outline-none focus:border-green-500 transition-colors"
      />
    </div>
  );
};
