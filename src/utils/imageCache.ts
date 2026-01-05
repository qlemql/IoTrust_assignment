// 이미지 로드 상태 캐시
// LRU 방식으로 최근 200개만 유지

const MAX_CACHE_SIZE = 200;
const cache = new Map<string, boolean>();

export const imageCache = {
  has: (url: string): boolean => cache.has(url),

  add: (url: string): void => {
    // LRU: 최대 크기 초과 시 가장 오래된 항목 제거
    if (cache.size >= MAX_CACHE_SIZE) {
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }
    cache.set(url, true);
  },

  // 이미지 프리로딩 (WebP 실패 시 원본으로 폴백)
  preload: (url: string): Promise<string | null> => {
    return new Promise((resolve) => {
      // 이미 캐시에 있으면 스킵
      if (cache.has(url)) {
        resolve(url);
        return;
      }

      // WebP 버전과 원본 URL 준비
      const webpUrl = url.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const hasWebpVariant = webpUrl !== url;
      const originalUrl = url.replace(/\.webp$/i, '.png'); // webp가 들어오면 원본으로

      // WebP 캐시 확인
      if (hasWebpVariant && cache.has(webpUrl)) {
        resolve(webpUrl);
        return;
      }

      const img = new Image();

      img.onload = () => {
        imageCache.add(img.src);
        resolve(img.src);
      };

      img.onerror = () => {
        // WebP 실패 시 원본 시도
        if (img.src.endsWith('.webp')) {
          img.src = originalUrl;
        } else {
          // 원본도 실패
          resolve(null);
        }
      };

      // WebP 우선 시도
      img.src = hasWebpVariant ? webpUrl : url;
    });
  },

  // 여러 이미지 프리로딩 (병렬)
  preloadBatch: (urls: string[]): void => {
    const preloadFn = () => {
      urls.forEach((url) => {
        // 원본 URL로 정규화
        const originalUrl = url.replace(/\.webp$/i, '.png');
        const webpUrl = originalUrl.replace(/\.(png|jpg|jpeg)$/i, '.webp');

        // 이미 캐시에 있으면 스킵
        if (cache.has(originalUrl) || cache.has(webpUrl)) {
          return;
        }

        imageCache.preload(originalUrl);
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadFn);
    } else {
      setTimeout(preloadFn, 0);
    }
  },

  clear: (): void => {
    cache.clear();
  },

  size: (): number => cache.size,
};
