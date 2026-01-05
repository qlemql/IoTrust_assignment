import { useState } from 'react';
import type { Banner, Language } from '../../types';

interface Props {
  banner: Banner;
  language: Language;
  onCtaClick: (url: string) => void;
  indicator?: string;
}

// 어두운 배경을 가진 배너 (흰색 텍스트 사용)
const DARK_BACKGROUND_BANNERS = ['banner-dcent', 'banner-blog'];

// CTA 버튼을 숨길 배너
const HIDE_CTA_BANNERS = ['banner-mapo'];

// 배너 통일 비율
const BANNER_ASPECT_RATIO = 'aspect-[19/8]';

export const BannerSlide = ({ banner, language, onCtaClick, indicator }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isDarkBackground = DARK_BACKGROUND_BANNERS.includes(banner.id);
  const hideCta = HIDE_CTA_BANNERS.includes(banner.id);
  const textColorClass = isDarkBackground ? 'text-white' : 'text-gray-900';

  const handleClick = () => {
    onCtaClick(banner.ctaUrl[language]);
  };

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  return (
    <div
      className={`relative w-full overflow-hidden cursor-pointer bg-gray-200 ${BANNER_ASPECT_RATIO}`}
      onClick={handleClick}
    >
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {!imageError && (
        <img
          src={banner.imageUrl[language]}
          alt={banner.description[language]}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
      )}
      <div
        className={`absolute bottom-4 left-0 right-0 p-4 ${textColorClass}`}
      >
        <p className="text-sm mb-3 whitespace-pre-line">
          {banner.description[language]}
        </p>
        {!hideCta && (
          isDarkBackground ? (
            <button
              className="px-4 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              {banner.ctaText[language]}
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors min-h-[44px]"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              {banner.ctaText[language]}
            </button>
          )
        )}
      </div>
      {indicator && (
        isDarkBackground ? (
          <div className="absolute bottom-3 right-3 text-xs px-3 py-1 rounded-full z-10 bg-white/70 text-gray-900">
            {indicator}
          </div>
        ) : (
          <div className="absolute bottom-3 right-3 text-xs px-3 py-1 rounded-full z-10 bg-black/50 text-white">
            {indicator}
          </div>
        )
      )}
    </div>
  );
};
