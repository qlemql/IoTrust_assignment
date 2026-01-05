import { useState, useRef, useEffect, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useConfigStore } from '../../stores/configStore';
import { useInfiniteServices, flattenServices } from '../../hooks/useInfiniteServices';
import { filterAndSearchServices } from '../../utils/filterServices';
import { ServiceSearch } from './ServiceSearch';
import { ServiceItem } from './ServiceItem';
import { ServiceSkeleton } from './ServiceSkeleton';
import type { Service } from '../../types';
import { SERVICE_ITEM_HEIGHT } from '../../constants';

interface Props {
  onServiceSelect: (service: Service) => void;
}

const TEXTS = {
  title: {
    ko: '목록',
    en: 'LIST',
  },
  empty: {
    ko: '서비스가 없습니다',
    en: 'No services found',
  },
  error: {
    ko: '서비스를 불러오는데 실패했습니다',
    en: 'Failed to load services',
  },
  loadingMore: {
    ko: '더 불러오는 중...',
    en: 'Loading more...',
  },
};

export const ServiceList = ({ onServiceSelect }: Props) => {
  const language = useConfigStore((state) => state.language);
  const platform = useConfigStore((state) => state.platform);
  const environment = useConfigStore((state) => state.environment);

  const [searchQuery, setSearchQuery] = useState('');
  const parentRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteServices();

  const allServices = flattenServices(data?.pages);

  const filteredServices = filterAndSearchServices(
    allServices,
    { language, platform, environment },
    searchQuery
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: parentRef.current,
      rootMargin: '100px',
      threshold: 0,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  const virtualizer = useVirtualizer({
    count: filteredServices.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => SERVICE_ITEM_HEIGHT,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <section className="px-4">
      <div className="mb-3">
        <ServiceSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      <h2 className="text-base font-semibold text-gray-900 mb-3">
        {TEXTS.title[language]}
      </h2>

      {isLoading ? (
        <ServiceSkeleton count={8} />
      ) : isError ? (
        <div className="py-8 text-center">
          <p className="text-sm text-red-500">{TEXTS.error[language]}</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-gray-500">{TEXTS.empty[language]}</p>
        </div>
      ) : (
        <div
          ref={parentRef}
          className="h-[calc(100vh-380px)] overflow-auto bg-white rounded-lg"
        >
          <div
            className="relative w-full"
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            {virtualItems.map((virtualItem) => {
              const service = filteredServices[virtualItem.index];
              return (
                <div
                  key={service.id}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <ServiceItem service={service} onSelect={onServiceSelect} />
                </div>
              );
            })}
          </div>

          <div ref={loadMoreRef} className="h-1" />

          {isFetchingNextPage && (
            <div className="py-4 text-center">
              <p className="text-sm text-gray-500">
                {TEXTS.loadingMore[language]}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
