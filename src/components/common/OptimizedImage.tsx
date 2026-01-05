import { useState, useRef, useEffect } from 'react';

type ImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  src: string;
  alt: string;
  size?: ImageSize;
  className?: string;
  fallbackSrc?: string;
}

const SIZE_MAP: Record<ImageSize, string> = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-20 h-20',
};

const DEFAULT_FALLBACK = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpolyline points="21 15 16 10 5 21"/%3E%3C/svg%3E';

export const OptimizedImage = ({
  src,
  alt,
  size = 'md',
  className = '',
  fallbackSrc = DEFAULT_FALLBACK,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setHasError(true);

  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const imageSrc = hasError ? fallbackSrc : src;
  const sizeClass = SIZE_MAP[size];

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${sizeClass} ${className}`}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      {isInView && (
        <picture>
          {!hasError && <source srcSet={webpSrc} type="image/webp" />}
          <img
            src={imageSrc}
            alt={alt}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded || hasError ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </picture>
      )}
    </div>
  );
};
