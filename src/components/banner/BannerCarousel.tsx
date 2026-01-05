import { useState, useRef } from 'react';
import type { Banner } from '../../types';
import { useConfigStore } from '../../stores/configStore';
import { BannerSlide } from './BannerSlide';
import { BannerSkeleton } from './BannerSkeleton';

interface Props {
  banners: Banner[];
  isLoading?: boolean;
}

const SWIPE_THRESHOLD = 50;

export const BannerCarousel = ({ banners, isLoading = false }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const language = useConfigStore((state) => state.language);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0 && currentIndex < banners.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleCtaClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="px-4">
        <BannerSkeleton />
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="px-4">
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0">
              <BannerSlide
                banner={banner}
                language={language}
                onCtaClick={handleCtaClick}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-2 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {currentIndex + 1}/{banners.length}
        </div>
      </div>

      {banners.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-green-500' : 'bg-gray-300'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
