import type { Favorite } from '../types';
import { IMAGE_CDN_BASE_URL } from '../constants';

export const initialFavorites: Favorite[] = [
  {
    id: 'fav-1',
    name: 'Uniswap',
    url: 'https://app.uniswap.org',
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon1.png`,
  },
  {
    id: 'fav-2',
    name: 'Aave',
    url: 'https://app.aave.com',
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon2.png`,
  },
  {
    id: 'fav-3',
    name: 'OpenSea',
    url: 'https://opensea.io',
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon3.png`,
  },
];
