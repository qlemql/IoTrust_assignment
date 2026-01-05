import type { Banner, Service, Favorite } from '../types';
import { banners } from '../mocks/banners';
import { services } from '../mocks/services';
import { initialFavorites } from '../mocks/favorites';
import { API_BASE_URL, DEFAULT_ENVIRONMENT, PAGE_SIZE } from '../constants';

const ENV = DEFAULT_ENVIRONMENT;
const useMock = ENV === 'dev';

const fetchData = async <T>(endpoint: string, mockData: T): Promise<T> => {
  if (useMock) {
    return Promise.resolve(mockData);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
};

export interface PaginatedResponse<T> {
  data: T[];
  nextPage: number | null;
  totalCount: number;
}

export interface GetServicesParams {
  page?: number;
  pageSize?: number;
}

const getMockPaginatedServices = (
  page: number,
  pageSize: number
): PaginatedResponse<Service> => {
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = services.slice(startIndex, endIndex);
  const hasMore = endIndex < services.length;

  return {
    data: paginatedData,
    nextPage: hasMore ? page + 1 : null,
    totalCount: services.length,
  };
};

export const getBanners = () => fetchData<Banner[]>('/banners', banners);

export const getServices = () => fetchData<Service[]>('/services', services);

export const getServicesPaginated = async ({
  page = 0,
  pageSize = PAGE_SIZE,
}: GetServicesParams = {}): Promise<PaginatedResponse<Service>> => {
  if (useMock) {
    // 실제 API 호출처럼 약간의 지연 추가
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getMockPaginatedServices(page, pageSize);
  }

  const response = await fetch(
    `${API_BASE_URL}/services?page=${page}&pageSize=${pageSize}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
};

export const getFavorites = () => fetchData<Favorite[]>('/favorites', initialFavorites);
