import type { Service, Language, Platform, Environment } from '../types';
import { IMAGE_CDN_BASE_URL } from '../constants';

// 기본 서비스 데이터 (10개)
const baseServices: Service[] = [
  {
    id: 'moonpay',
    name: {
      ko: 'MoonPay',
      en: 'MoonPay',
    },
    description: {
      ko: 'MoonPay는 VISA/Mastercard 결제로 암호화폐를 간편하고 안전하게 구매할 수 있는 서비스입니다',
      en: 'MoonPay offers simple and safer way to buy crypto instantly using VISA/Mastercard payment',
    },
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_moonpay.png`,
    url: 'https://buy.moonpay.com',
    networks: [],
    supportedLanguages: ['en'],
    supportedPlatforms: ['ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
  {
    id: 'ftso-portal',
    name: {
      ko: 'FTSO Portal',
      en: 'FTSO Portal',
    },
    description: {
      ko: 'FTSO Portal은 사용자가 원하는 FTSO provider에 Vote Power를 쉽고 빠르게 위임할 수 있는 기능을 제공합니다',
      en: "FTSO Portal is a service by D'CENT to provide fast and easy way to delegate Vote Power",
    },
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_ftso.png`,
    url: 'https://ftsoportal.com/',
    networks: ['Songbird', 'Flare'],
    supportedLanguages: ['ko', 'en'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
  {
    id: 'astar-portal',
    name: {
      ko: 'Astar Portal',
      en: 'Astar Portal',
    },
    description: {
      ko: '아스타포탈은 Astar Network에서 제공하는 모든 것을 사용하기 위한 공식 애플리케이션입니다',
      en: 'Astar Portal is the official Astar Network application for using everything that Astar Network offers',
    },
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_astar.png`,
    url: 'https://portal.astar.network/',
    networks: ['Astar'],
    supportedLanguages: ['ko', 'en'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage'],
  },
  {
    id: '1inch',
    name: {
      ko: '1inch',
      en: '1inch',
    },
    description: {
      ko: '1inch는 모든 주요 DEX 거래소의 유동성과 가격 정보를 하나의 플랫폼에서 제공하는 탈중앙화 거래소 애그리게이터입니다',
      en: '1inch is a decentralized exchange (DEX) aggregator designed to aggregate liquidity from all major DEXes',
    },
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_1inch.png`,
    url: 'https://app.1inch.io/',
    networks: ['Ethereum'],
    supportedLanguages: ['ko', 'en'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
  {
    id: 'xdsea',
    name: {
      ko: 'XDSea',
      en: 'XDSea',
    },
    description: {
      ko: 'XDSea는 XDC 네트워크에 구축된 NFT를 사고 파는 세계 최초이자 최대 규모의 P2P 분산형 마켓플레이스입니다',
      en: "XDSea is the world's first and largest peer-to-peer decentralized marketplace for buying and selling NFTs on XDC Network",
    },
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_xdsea.png`,
    url: 'https://xdsea.com/',
    networks: ['XDC Network'],
    supportedLanguages: ['ko', 'en'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
  {
    id: 'compound',
    name: {
      ko: 'Compound',
      en: 'Compound',
    },
    description: {
      ko: 'Compound는 담보를 통해 이자를 얻거나 자산을 빌릴 수 있는 이더리움 기반의 머니 마켓 프로토콜입니다',
      en: "Compound is Ethereum's algorithmic money market protocol enabling interest earning on crypto assets",
    },
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_compound.png`,
    url: 'https://app.compound.finance/',
    networks: ['Ethereum'],
    supportedLanguages: ['ko', 'en'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
  {
    id: 'pooltogether',
    name: {
      ko: 'PoolTogether',
      en: 'PoolTogether',
    },
    description: {
      ko: 'PoolTogether는 저축을 재미있게 하는 이더리움 기반의 서비스입니다',
      en: 'PoolTogether is an Ethereum based application that makes saving money as fun as a game',
    },
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_pooltogether.png`,
    url: 'https://app.pooltogether.com/',
    networks: ['Ethereum'],
    supportedLanguages: ['ko', 'en'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
  {
    id: 'opensea',
    name: {
      ko: 'OpenSea',
      en: 'OpenSea',
    },
    description: {
      ko: 'OpenSea는 수집품, 게임 아이템, 디지털 아트와 같은 이더리움 기반의 디지털 상품을 거래할 수 있는 마켓플레이스입니다',
      en: 'OpenSea is a marketplace for digital goods, including collectibles, game items, and digital art on Ethereum',
    },
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_opensea.png`,
    url: 'https://opensea.io/',
    networks: ['Ethereum', 'Polygon'],
    supportedLanguages: ['ko', 'en'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
  {
    id: 'bluewhale',
    name: {
      ko: 'BlueWhale',
      en: 'BlueWhale',
    },
    description: {
      ko: '블루웨일 프로토콜은 사용하기 쉬운 디파이 서비스를 지향하는 프로젝트입니다',
      en: 'BlueWhale Protocol is a project that aims to provide easy-to-use DeFi services',
    },
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_bluewhale.png`,
    url: 'https://bwpm.io/',
    networks: ['Kaia'],
    supportedLanguages: ['ko'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
  {
    id: 'uniswap',
    name: {
      ko: 'Uniswap',
      en: 'Uniswap',
    },
    description: {
      ko: 'Uniswap은 이더리움에서 가장 인기 있는 탈중앙화 거래소입니다',
      en: 'Uniswap is the most popular decentralized exchange on Ethereum',
    },
    iconUrl: `${IMAGE_CDN_BASE_URL}/icon_uniswap.png`,
    url: 'https://app.uniswap.org/',
    networks: ['Ethereum'],
    supportedLanguages: ['ko', 'en'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
];

// 다양한 조건 조합을 위한 설정
const languageVariants: Language[][] = [
  ['ko'],
  ['en'],
  ['ko', 'en'],
];

const platformVariants: Platform[][] = [
  ['android'],
  ['ios'],
  ['android', 'ios'],
];

const environmentVariants: Environment[][] = [
  ['dev'],
  ['dev', 'stage'],
  ['dev', 'stage', 'prod'],
  ['stage', 'prod'],
  ['prod'],
];

// 1000개 이상의 서비스 생성
const generateServices = (): Service[] => {
  const generatedServices: Service[] = [];
  const targetCount = 1050; // 1000개 이상 목표

  // 먼저 기본 10개 서비스 추가
  generatedServices.push(...baseServices);

  // 나머지 서비스 생성 (다양한 조건 조합으로)
  let index = baseServices.length;

  while (generatedServices.length < targetCount) {
    const baseService = baseServices[index % baseServices.length];
    const variantIndex = Math.floor(index / baseServices.length);

    // 다양한 조건 조합 선택
    const langVariant = languageVariants[variantIndex % languageVariants.length];
    const platformVariant = platformVariants[Math.floor(variantIndex / languageVariants.length) % platformVariants.length];
    const envVariant = environmentVariants[Math.floor(variantIndex / (languageVariants.length * platformVariants.length)) % environmentVariants.length];

    const newService: Service = {
      ...baseService,
      id: `${baseService.id}-${index}`,
      name: {
        ko: `${baseService.name.ko} #${index}`,
        en: `${baseService.name.en} #${index}`,
      },
      supportedLanguages: langVariant,
      supportedPlatforms: platformVariant,
      supportedEnvironments: envVariant,
    };

    generatedServices.push(newService);
    index++;
  }

  return generatedServices;
};

export const services: Service[] = generateServices();
