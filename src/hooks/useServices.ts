import { useQuery } from '@tanstack/react-query';
import { getServices } from '../services/api';
import type { Service } from '../types';

const QUERY_KEY = ['services'] as const;

export const useServices = () => {
  return useQuery<Service[], Error>({
    queryKey: QUERY_KEY,
    queryFn: getServices,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};
