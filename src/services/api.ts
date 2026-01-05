import type { Banner, Service, Favorite } from '../types';
import { banners } from '../mocks/banners';
import { services } from '../mocks/services';
import { initialFavorites } from '../mocks/favorites';
import { API_BASE_URL, DEFAULT_ENVIRONMENT } from '../constants';

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

export const getBanners = () => fetchData<Banner[]>('/banners', banners);
export const getServices = () => fetchData<Service[]>('/services', services);
export const getFavorites = () => fetchData<Favorite[]>('/favorites', initialFavorites);
