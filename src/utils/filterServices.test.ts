import { describe, it, expect } from 'vitest';
import { shouldShowService, filterServices, searchServices, filterAndSearchServices } from './filterServices';
import type { Service } from '../types';

const createMockService = (overrides: Partial<Service> = {}): Service => ({
  id: 'test-service',
  name: { ko: '테스트', en: 'Test' },
  description: { ko: '설명', en: 'Description' },
  iconUrl: 'https://test.com/icon.png',
  url: 'https://test.com',
  networks: ['Ethereum'],
  supportedLanguages: ['ko', 'en'],
  supportedPlatforms: ['android', 'ios'],
  supportedEnvironments: ['dev', 'stage', 'prod'],
  ...overrides,
});

describe('shouldShowService', () => {
  it('모든 조건을 만족하면 true를 반환해야 한다', () => {
    const service = createMockService();
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    expect(shouldShowService(service, config)).toBe(true);
  });

  it('언어가 지원되지 않으면 false를 반환해야 한다', () => {
    const service = createMockService({ supportedLanguages: ['en'] });
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    expect(shouldShowService(service, config)).toBe(false);
  });

  it('플랫폼이 지원되지 않으면 false를 반환해야 한다', () => {
    const service = createMockService({ supportedPlatforms: ['ios'] });
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    expect(shouldShowService(service, config)).toBe(false);
  });

  it('환경이 지원되지 않으면 false를 반환해야 한다', () => {
    const service = createMockService({ supportedEnvironments: ['prod'] });
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    expect(shouldShowService(service, config)).toBe(false);
  });

  it('여러 조건 중 하나라도 만족하지 않으면 false를 반환해야 한다', () => {
    const service = createMockService({
      supportedLanguages: ['ko'],
      supportedPlatforms: ['android'],
      supportedEnvironments: ['stage'],
    });
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    expect(shouldShowService(service, config)).toBe(false);
  });

  it('supportedLanguages가 빈 배열이면 false를 반환해야 한다', () => {
    const service = createMockService({ supportedLanguages: [] });
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    expect(shouldShowService(service, config)).toBe(false);
  });

  it('supportedPlatforms가 빈 배열이면 false를 반환해야 한다', () => {
    const service = createMockService({ supportedPlatforms: [] });
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    expect(shouldShowService(service, config)).toBe(false);
  });

  it('supportedEnvironments가 빈 배열이면 false를 반환해야 한다', () => {
    const service = createMockService({ supportedEnvironments: [] });
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    expect(shouldShowService(service, config)).toBe(false);
  });
});

describe('filterServices', () => {
  it('조건에 맞는 서비스만 필터링해야 한다', () => {
    const services: Service[] = [
      createMockService({ id: 'service-1', supportedLanguages: ['ko'] }),
      createMockService({ id: 'service-2', supportedLanguages: ['en'] }),
      createMockService({ id: 'service-3', supportedLanguages: ['ko', 'en'] }),
    ];
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    const result = filterServices(services, config);

    expect(result).toHaveLength(2);
    expect(result.map((s) => s.id)).toEqual(['service-1', 'service-3']);
  });

  it('빈 배열이 입력되면 빈 배열을 반환해야 한다', () => {
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    const result = filterServices([], config);

    expect(result).toEqual([]);
  });

  it('조건에 맞는 서비스가 없으면 빈 배열을 반환해야 한다', () => {
    const services: Service[] = [
      createMockService({ supportedLanguages: ['en'], supportedPlatforms: ['ios'] }),
    ];
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    const result = filterServices(services, config);

    expect(result).toEqual([]);
  });

  it('모든 서비스가 조건을 만족하면 전체를 반환해야 한다', () => {
    const services: Service[] = [
      createMockService({ id: 'service-1' }),
      createMockService({ id: 'service-2' }),
      createMockService({ id: 'service-3' }),
    ];
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    const result = filterServices(services, config);

    expect(result).toHaveLength(3);
  });
});

describe('searchServices', () => {
  it('검색어가 비어있으면 전체를 반환해야 한다', () => {
    const services: Service[] = [
      createMockService({ id: 'service-1', name: { ko: '서비스1', en: 'Service1' } }),
      createMockService({ id: 'service-2', name: { ko: '서비스2', en: 'Service2' } }),
    ];

    const result = searchServices(services, '', 'ko');

    expect(result).toHaveLength(2);
  });

  it('이름으로 검색할 수 있어야 한다', () => {
    const services: Service[] = [
      createMockService({ id: 'service-1', name: { ko: '암호화폐 구매', en: 'Buy Crypto' } }),
      createMockService({ id: 'service-2', name: { ko: '메타마스크', en: 'MetaMask' } }),
    ];

    const result = searchServices(services, '암호화폐', 'ko');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('service-1');
  });

  it('설명으로는 검색되지 않아야 한다 (이름만 검색)', () => {
    const services: Service[] = [
      createMockService({
        id: 'service-1',
        name: { ko: '서비스1', en: 'Service1' },
        description: { ko: '블록체인 서비스', en: 'Blockchain service' }
      }),
      createMockService({
        id: 'service-2',
        name: { ko: '서비스2', en: 'Service2' },
        description: { ko: '일반 서비스', en: 'General service' }
      }),
    ];

    const result = searchServices(services, '블록체인', 'ko');

    expect(result).toHaveLength(0);
  });

  it('대소문자를 구분하지 않아야 한다', () => {
    const services: Service[] = [
      createMockService({ id: 'service-1', name: { ko: 'FTSO Portal', en: 'FTSO Portal' } }),
    ];

    const result = searchServices(services, 'ftso', 'ko');

    expect(result).toHaveLength(1);
  });

  it('검색 결과가 없으면 빈 배열을 반환해야 한다', () => {
    const services: Service[] = [
      createMockService({ id: 'service-1', name: { ko: '서비스1', en: 'Service1' } }),
    ];

    const result = searchServices(services, '존재하지않는검색어', 'ko');

    expect(result).toHaveLength(0);
  });
});

describe('filterAndSearchServices', () => {
  it('필터링과 검색을 함께 적용해야 한다', () => {
    const services: Service[] = [
      createMockService({
        id: 'service-1',
        name: { ko: '암호화폐', en: 'Crypto' },
        supportedLanguages: ['ko']
      }),
      createMockService({
        id: 'service-2',
        name: { ko: '암호화폐2', en: 'Crypto2' },
        supportedLanguages: ['en']
      }),
      createMockService({
        id: 'service-3',
        name: { ko: '다른서비스', en: 'Other' },
        supportedLanguages: ['ko']
      }),
    ];
    const config = { language: 'ko' as const, platform: 'android' as const, environment: 'dev' as const };

    const result = filterAndSearchServices(services, config, '암호화폐');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('service-1');
  });
});
