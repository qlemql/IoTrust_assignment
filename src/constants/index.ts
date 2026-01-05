import type { Language, Platform, Environment } from '../types';

export const DEFAULT_LANGUAGE: Language = 'ko';
export const DEFAULT_PLATFORM: Platform = 'android';
export const DEFAULT_ENVIRONMENT: Environment = import.meta.env.VITE_ENV ?? 'dev';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const SERVICE_ITEM_HEIGHT = 90;
export const PAGE_SIZE = 20;
export const SWIPE_THRESHOLD = 50;

export const IMAGE_CDN_BASE_URL = 'https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images';

export const TOUCH_MIN_SIZE = 44;
export const SECTION_GAP = 24;
export const ITEM_GAP = 12;
export const INNER_PADDING = 16;

export const COLORS = {
  primary: '#22C55E',
  background: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export const UI_TEXT = {
  favorites: {
    ko: '즐겨찾기',
    en: 'Favorites',
  },
  serviceList: {
    ko: '목록',
    en: 'LIST',
  },
  deleteConfirm: {
    title: 'Delete favorite',
    message: 'Do you really want to delete this site from your favorites?',
    cancel: 'Cancel',
    ok: 'OK',
  },
  search: {
    placeholder: {
      ko: '검색어를 입력하세요',
      en: 'Search services',
    },
  },
  serviceDetail: {
    description: 'Description',
    go: 'Go',
  },
  empty: {
    favorites: {
      ko: '즐겨찾기가 없습니다',
      en: 'No favorites',
    },
    services: {
      ko: '서비스가 없습니다',
      en: 'No services',
    },
  },
} as const;
