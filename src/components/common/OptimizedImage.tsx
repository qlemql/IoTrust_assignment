import { useState, useRef, useEffect, useCallback } from 'react';
import { imageCache } from '../../utils/imageCache';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const DEFAULT_FALLBACK = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpolyline points="21 15 16 10 5 21"/%3E%3C/svg%3E';

// 캐시된 URL 찾기 (webp 우선, 없으면 원본)
const getCachedUrl = (src: string): string | null => {
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const hasWebpVariant = webpSrc !== src;

  if (hasWebpVariant && imageCache.has(webpSrc)) {
    return webpSrc;
  }
  if (imageCache.has(src)) {
    return src;
  }
  return null;
};

export const OptimizedImage = ({
  src,
  alt,
  width = 48,
  height = 48,
  className = '',
}: Props) => {
  // 캐시된 URL 확인 (마운트 시 한 번만)
  const [cachedUrl] = useState(() => getCachedUrl(src));
  const isCached = cachedUrl !== null;

  const [isLoaded, setIsLoaded] = useState(isCached);
  const [currentSrc, setCurrentSrc] = useState<string | null>(cachedUrl);
  const [isInView, setIsInView] = useState(isCached);
  const containerRef = useRef<HTMLDivElement>(null);
  const triedWebp = useRef(false);
  const triedOriginal = useRef(false);

  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const hasWebpVariant = webpSrc !== src;

  useEffect(() => {
    // 이미 캐시에 있으면 observer 불필요
    if (isCached) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isCached]);

  useEffect(() => {
    // 이미 캐시에 있으면 스킵
    if (isCached) return;

    if (isInView && !currentSrc) {
      triedWebp.current = false;
      triedOriginal.current = false;
      if (hasWebpVariant) {
        setCurrentSrc(webpSrc);
      } else {
        setCurrentSrc(src);
        triedWebp.current = true;
      }
    }
  }, [isInView, currentSrc, hasWebpVariant, webpSrc, src, isCached]);

  // 이벤트 타겟에서 직접 URL을 가져와 캐시에 저장
  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const loadedUrl = e.currentTarget.src;
    if (loadedUrl && !loadedUrl.startsWith('data:')) {
      imageCache.add(loadedUrl);
    }
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    if (!triedWebp.current && hasWebpVariant) {
      triedWebp.current = true;
      setCurrentSrc(src);
    } else if (!triedOriginal.current) {
      triedOriginal.current = true;
      setCurrentSrc(DEFAULT_FALLBACK);
      setIsLoaded(true);
    }
  }, [hasWebpVariant, src]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
