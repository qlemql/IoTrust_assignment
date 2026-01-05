import { describe, it, expect } from 'vitest';
import { shouldShowService, filterServices } from './filterServices';
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
