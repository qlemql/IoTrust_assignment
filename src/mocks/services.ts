import type { Service, Language, Platform, Environment } from '../types';
import { IMAGE_CDN_BASE_URL } from '../constants';

const networks = ['Ethereum', 'Polygon', 'BSC', 'Arbitrum', 'Optimism', 'Avalanche', 'Solana', 'Klaytn'];
const languages: Language[] = ['ko', 'en'];
const platforms: Platform[] = ['android', 'ios'];
const environments: Environment[] = ['dev', 'stage', 'prod'];

const serviceNames = [
  { ko: 'Uniswap', en: 'Uniswap' },
  { ko: 'Aave', en: 'Aave' },
  { ko: 'Compound', en: 'Compound' },
  { ko: 'SushiSwap', en: 'SushiSwap' },
  { ko: 'Curve Finance', en: 'Curve Finance' },
  { ko: 'PancakeSwap', en: 'PancakeSwap' },
  { ko: 'Lido', en: 'Lido' },
  { ko: 'MakerDAO', en: 'MakerDAO' },
  { ko: 'Yearn Finance', en: 'Yearn Finance' },
  { ko: '1inch', en: '1inch' },
];

const descriptions = [
  { ko: '탈중앙화 거래소에서 토큰을 스왑하세요', en: 'Swap tokens on decentralized exchange' },
  { ko: '암호화폐를 예치하고 이자를 받으세요', en: 'Deposit crypto and earn interest' },
  { ko: '유동성을 제공하고 수익을 창출하세요', en: 'Provide liquidity and generate yield' },
  { ko: '스테이킹으로 보상을 받으세요', en: 'Earn rewards through staking' },
  { ko: 'NFT를 거래하고 수집하세요', en: 'Trade and collect NFTs' },
];

const getRandomSubset = <T>(arr: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateServices = (count: number): Service[] =>
  Array.from({ length: count }, (_, i) => {
    const nameIndex = i % serviceNames.length;
    const descIndex = i % descriptions.length;
    const suffix = i >= serviceNames.length ? ` ${Math.floor(i / serviceNames.length) + 1}` : '';

    return {
      id: `service-${i + 1}`,
      name: {
        ko: `${serviceNames[nameIndex].ko}${suffix}`,
        en: `${serviceNames[nameIndex].en}${suffix}`,
      },
      description: descriptions[descIndex],
      iconUrl: `${IMAGE_CDN_BASE_URL}/icon${(i % 10) + 1}.png`,
      url: `https://example.com/service/${i + 1}`,
      networks: getRandomSubset(networks, 1, 4),
      supportedLanguages: getRandomSubset(languages, 1, 2),
      supportedPlatforms: getRandomSubset(platforms, 1, 2),
      supportedEnvironments: getRandomSubset(environments, 1, 3),
    };
  });

export const services: Service[] = generateServices(1000);
