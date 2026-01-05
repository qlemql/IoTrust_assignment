import { useInfiniteQuery } from '@tanstack/react-query';
import { getServicesPaginated } from '../services/api';
import type { Service } from '../types';
import { PAGE_SIZE } from '../constants';

const QUERY_KEY = ['services', 'infinite'] as const;

export const useInfiniteServices = () => {
  return useInfiniteQuery({
    queryKey: QUERY_KEY,
    queryFn: ({ pageParam = 0 }) =>
      getServicesPaginated({ page: pageParam, pageSize: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};

export const flattenServices = (
  pages: { data: Service[] }[] | undefined
): Service[] => {
  if (!pages) return [];
  return pages.flatMap((page) => page.data);
};
