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
    <div>
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
          {banners.map((banner, index) => (
            <div key={banner.id} className="w-full min-w-full flex-shrink-0">
              <BannerSlide
                banner={banner}
                language={language}
                onCtaClick={handleCtaClick}
                indicator={index === currentIndex ? `${currentIndex + 1}/${banners.length}` : undefined}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
