import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceDetailSheet } from './ServiceDetailSheet';
import type { Service } from '../../types';

const mockService: Service = {
  id: 'service-1',
  name: { ko: '테스트 서비스', en: 'Test Service' },
  description: { ko: '테스트 설명입니다', en: 'Test description' },
  iconUrl: '/icon.png',
  url: 'https://test.com',
  networks: ['Ethereum', 'Polygon'],
  supportedLanguages: ['ko', 'en'],
  supportedPlatforms: ['android', 'ios'],
  supportedEnvironments: ['dev', 'stage', 'prod'],
};

describe('ServiceDetailSheet', () => {
  it('service가 null이면 렌더링하지 않아야 한다', () => {
    const { container } = render(
      <ServiceDetailSheet service={null} onClose={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('서비스 이름이 표시되어야 한다', () => {
    render(<ServiceDetailSheet service={mockService} onClose={vi.fn()} />);

    expect(screen.getByText('테스트 서비스')).toBeInTheDocument();
  });

  it('서비스 설명이 표시되어야 한다', () => {
    render(<ServiceDetailSheet service={mockService} onClose={vi.fn()} />);

    expect(screen.getByText('테스트 설명입니다')).toBeInTheDocument();
  });

  it('네트워크 목록이 표시되어야 한다', () => {
    render(<ServiceDetailSheet service={mockService} onClose={vi.fn()} />);

    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('Polygon')).toBeInTheDocument();
  });

  it('URL이 표시되어야 한다', () => {
    render(<ServiceDetailSheet service={mockService} onClose={vi.fn()} />);

    expect(screen.getByText('https://test.com')).toBeInTheDocument();
  });

  it('이동 버튼이 표시되어야 한다', () => {
    render(<ServiceDetailSheet service={mockService} onClose={vi.fn()} />);

    expect(screen.getByText('이동')).toBeInTheDocument();
  });

  it('이동 버튼 클릭 시 window.open이 호출되어야 한다', () => {
    const mockOpen = vi.fn();
    vi.stubGlobal('open', mockOpen);

    render(<ServiceDetailSheet service={mockService} onClose={vi.fn()} />);

    const goButton = screen.getByText('이동');
    fireEvent.click(goButton);

    expect(mockOpen).toHaveBeenCalledWith(
      'https://test.com',
      '_blank',
      'noopener,noreferrer'
    );

    vi.unstubAllGlobals();
  });
});
