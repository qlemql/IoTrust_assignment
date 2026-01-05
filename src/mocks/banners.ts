import type { Banner } from '../types';
import { IMAGE_CDN_BASE_URL } from '../constants';

export const banners: Banner[] = [
  {
    id: 'banner-mapo',
    imageUrl: {
      ko: `${IMAGE_CDN_BASE_URL}/banner_mapo_kr.png`,
      en: `${IMAGE_CDN_BASE_URL}/banner_mapo_en.png`,
    },  
    description: {
      ko: '',
      en: '',
    },
    ctaText: {
      ko: '',
      en: '',
    },
    ctaUrl: {
      ko: 'https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol',
      en: 'https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol',
    },
  },
  {
    id: 'banner-dcent',
    imageUrl: {
      ko: `${IMAGE_CDN_BASE_URL}/banner_dcent.png`,
      en: `${IMAGE_CDN_BASE_URL}/banner_dcent.png`,
    },
    description: {
      ko: '디센트 지문인증형 지갑으로\n한 층 더 강화된 보안을 경험하세요!',
      en: 'Enhance your security\nwith D\'CENT biometric wallet',
    },
    ctaText: {
      ko: '구매하기',
      en: 'Buy Now',
    },
    ctaUrl: {
      ko: 'https://store-kr.dcentwallet.com',
      en: 'https://store.dcentwallet.com',
    },
  },
  {
    id: 'banner-blog',
    imageUrl: {
      ko: `${IMAGE_CDN_BASE_URL}/banner_blog.png`,
      en: `${IMAGE_CDN_BASE_URL}/banner_blog.png`,
    },
    description: {
      ko: '새로운 디센트 블로그를 방문하여\n최신 업데이트를 먼저 확인해보세요!',
      en: 'Visit the new D\'CENT Blog\nto explore the latest updates first!',
    },
    ctaText: {
      ko: '확인하기',
      en: 'Explore',
    },
    ctaUrl: {
      ko: 'https://store-kr.dcentwallet.com/blogs/post',
      en: 'https://store.dcentwallet.com/blogs/post',
    },
  },
];
