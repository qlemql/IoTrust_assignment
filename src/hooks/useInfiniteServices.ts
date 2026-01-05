import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getServicesPaginated } from '../services/api';
import { imageCache } from '../utils/imageCache';
import type { Service } from '../types';
import { PAGE_SIZE } from '../constants';

const QUERY_KEY = ['services', 'infinite'] as const;

export const useInfiniteServices = () => {
  const lastPreloadedPage = useRef(-1);

  const query = useInfiniteQuery({
    queryKey: QUERY_KEY,
    queryFn: ({ pageParam = 0 }) =>
      getServicesPaginated({ page: pageParam, pageSize: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  // 새 페이지 로드 시 아이콘 프리로딩
  useEffect(() => {
    if (!query.data?.pages) return;

    const currentPageCount = query.data.pages.length;

    // 이미 프리로딩한 페이지는 스킵
    if (currentPageCount <= lastPreloadedPage.current) return;

    // 새로 로드된 페이지들의 아이콘 프리로딩
    for (let i = lastPreloadedPage.current + 1; i < currentPageCount; i++) {
      const page = query.data.pages[i];
      if (page?.data) {
        // 원본 URL로 프리로딩 (preload 함수가 WebP 폴백 처리)
        const urls = page.data.map((service) => service.iconUrl);
        imageCache.preloadBatch(urls);
      }
    }

    lastPreloadedPage.current = currentPageCount - 1;
  }, [query.data?.pages]);

  return query;
};

export const flattenServices = (
  pages: { data: Service[] }[] | undefined
): Service[] => {
  if (!pages) return [];
  return pages.flatMap((page) => page.data);
};
