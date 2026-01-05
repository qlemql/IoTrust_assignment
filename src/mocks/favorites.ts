import type { Favorite } from '../types';
import { IMAGE_CDN_BASE_URL } from '../constants';

export const initialFavorites: Favorite[] = [
  {
    id: 'opensea',
    name: 'OpenSea',
    url: 'https://opensea.io',
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_opensea.png`,
  },
  {
    id: 'moonpay',
    name: 'MoonPay',
    url: 'https://buy.moonpay.com/v2/buy',
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_moonpay.png`,
  },
  {
    id: 'rarible',
    name: 'Rarible',
    url: 'https://rarible.com/',
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_rarible.png`,
  },
];
