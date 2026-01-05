import type { Banner, Language } from '../../types';

interface Props {
  banner: Banner;
  language: Language;
  onCtaClick: (url: string) => void;
}

export const BannerSlide = ({ banner, language, onCtaClick }: Props) => {
  const handleClick = () => {
    onCtaClick(banner.ctaUrl[language]);
  };

  return (
    <div
      className="relative w-full h-48 rounded-xl overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={banner.imageUrl[language]}
        alt={banner.title[language]}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="text-lg font-bold mb-1">{banner.title[language]}</h2>
        <p className="text-sm opacity-90 mb-3">{banner.description[language]}</p>
        <button
          className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {banner.ctaText[language]}
        </button>
      </div>
    </div>
  );
};
