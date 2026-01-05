import type { Banner } from '../types';
import { IMAGE_CDN_BASE_URL } from '../constants';

export const banners: Banner[] = [
  {
    id: 'banner-1',
    imageUrl: {
      ko: `${IMAGE_CDN_BASE_URL}/banner1.png`,
      en: `${IMAGE_CDN_BASE_URL}/banner1.png`,
    },
    title: {
      ko: 'D\'CENT 지갑으로 DeFi 시작하기',
      en: 'Start DeFi with D\'CENT Wallet',
    },
    description: {
      ko: '안전하고 편리한 DeFi 서비스를 경험하세요',
      en: 'Experience safe and convenient DeFi services',
    },
    ctaText: {
      ko: '자세히 보기',
      en: 'Learn More',
    },
    ctaUrl: {
      ko: 'https://dcentwallet.com/ko',
      en: 'https://dcentwallet.com/en',
    },
  },
  {
    id: 'banner-2',
    imageUrl: {
      ko: `${IMAGE_CDN_BASE_URL}/banner2.png`,
      en: `${IMAGE_CDN_BASE_URL}/banner2.png`,
    },
    title: {
      ko: 'NFT 마켓플레이스',
      en: 'NFT Marketplace',
    },
    description: {
      ko: '다양한 NFT를 거래하세요',
      en: 'Trade various NFTs',
    },
    ctaText: {
      ko: '둘러보기',
      en: 'Explore',
    },
    ctaUrl: {
      ko: 'https://dcentwallet.com/ko/nft',
      en: 'https://dcentwallet.com/en/nft',
    },
  },
];
