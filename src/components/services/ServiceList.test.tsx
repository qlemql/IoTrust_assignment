import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ServiceList } from './ServiceList';
import * as api from '../../services/api';
import type { Service } from '../../types';

vi.mock('../../services/api');

const mockServices: Service[] = [
  {
    id: 'service-1',
    name: { ko: '암호화폐 구매', en: 'Buy Crypto' },
    description: { ko: '암호화폐를 구매하세요', en: 'Buy cryptocurrency' },
    iconUrl: '/icon1.png',
    url: 'https://test1.com',
    networks: ['Ethereum'],
    supportedLanguages: ['ko', 'en'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
  {
    id: 'service-2',
    name: { ko: '메타마스크 연동', en: 'MetaMask Connect' },
    description: { ko: '메타마스크와 연동하세요', en: 'Connect with MetaMask' },
    iconUrl: '/icon2.png',
    url: 'https://test2.com',
    networks: ['Ethereum'],
    supportedLanguages: ['ko', 'en'],
    supportedPlatforms: ['android', 'ios'],
    supportedEnvironments: ['dev', 'stage', 'prod'],
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('ServiceList', () => {
  beforeEach(() => {
    vi.mocked(api.getServices).mockResolvedValue(mockServices);
  });

  it('로딩 중이면 스켈레톤이 표시되어야 한다', () => {
    vi.mocked(api.getServices).mockImplementation(
      () => new Promise(() => {})
    );

    render(<ServiceList onServiceSelect={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('섹션 헤더가 표시되어야 한다', () => {
    render(<ServiceList onServiceSelect={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('목록')).toBeInTheDocument();
  });

  it('검색창이 표시되어야 한다', () => {
    render(<ServiceList onServiceSelect={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByPlaceholderText('서비스 검색')).toBeInTheDocument();
  });

  it('검색어를 입력할 수 있어야 한다', () => {
    render(<ServiceList onServiceSelect={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    const searchInput = screen.getByPlaceholderText('서비스 검색') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: '테스트 검색어' } });

    expect(searchInput.value).toBe('테스트 검색어');
  });

  it('X 버튼 클릭 시 검색어가 초기화되어야 한다', () => {
    render(<ServiceList onServiceSelect={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    const searchInput = screen.getByPlaceholderText('서비스 검색') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: '검색어' } });

    expect(searchInput.value).toBe('검색어');

    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);

    expect(searchInput.value).toBe('');
  });
});
