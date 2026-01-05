import { useQuery } from '@tanstack/react-query';
import { getBanners } from '../services/api';
import type { Banner } from '../types';

const QUERY_KEY = ['banners'] as const;

export const useBanners = () => {
  return useQuery<Banner[], Error>({
    queryKey: QUERY_KEY,
    queryFn: getBanners,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};
