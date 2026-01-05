import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BannerCarousel } from './BannerCarousel';
import type { Banner } from '../../types';

const mockBanners: Banner[] = [
  {
    id: 'banner-1',
    imageUrl: { ko: '/banner1.png', en: '/banner1-en.png' },
    title: { ko: '배너 제목 1', en: 'Banner Title 1' },
    description: { ko: '배너 설명 1', en: 'Banner Description 1' },
    ctaText: { ko: '자세히 보기', en: 'Learn More' },
    ctaUrl: { ko: 'https://example.com/ko', en: 'https://example.com/en' },
  },
  {
    id: 'banner-2',
    imageUrl: { ko: '/banner2.png', en: '/banner2-en.png' },
    title: { ko: '배너 제목 2', en: 'Banner Title 2' },
    description: { ko: '배너 설명 2', en: 'Banner Description 2' },
    ctaText: { ko: '둘러보기', en: 'Explore' },
    ctaUrl: { ko: 'https://example2.com/ko', en: 'https://example2.com/en' },
  },
];

describe('BannerCarousel', () => {
  beforeEach(() => {
    vi.stubGlobal('open', vi.fn());
  });

  it('배너가 없으면 렌더링되지 않아야 한다', () => {
    const { container } = render(<BannerCarousel banners={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('로딩 중이면 스켈레톤이 표시되어야 한다', () => {
    render(<BannerCarousel banners={[]} isLoading={true} />);
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('배너가 렌더링되어야 한다', () => {
    render(<BannerCarousel banners={mockBanners} />);
    expect(screen.getByText('배너 제목 1')).toBeInTheDocument();
  });

  it('페이지 인디케이터가 표시되어야 한다', () => {
    render(<BannerCarousel banners={mockBanners} />);
    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('인디케이터 클릭 시 슬라이드가 변경되어야 한다', () => {
    render(<BannerCarousel banners={mockBanners} />);

    const indicators = screen.getAllByRole('button', { name: /Go to slide/i });
    fireEvent.click(indicators[1]);

    expect(screen.getByText('2/2')).toBeInTheDocument();
  });

  it('CTA 버튼 클릭 시 새 창이 열려야 한다', () => {
    render(<BannerCarousel banners={mockBanners} />);

    const ctaButton = screen.getByText('자세히 보기');
    fireEvent.click(ctaButton);

    expect(window.open).toHaveBeenCalledWith(
      'https://example.com/ko',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('스와이프로 다음 슬라이드로 이동해야 한다', () => {
    render(<BannerCarousel banners={mockBanners} />);

    const carousel = document.querySelector('.overflow-hidden');
    expect(carousel).toBeInTheDocument();

    fireEvent.touchStart(carousel!, { touches: [{ clientX: 200 }] });
    fireEvent.touchMove(carousel!, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(carousel!);

    expect(screen.getByText('2/2')).toBeInTheDocument();
  });

  it('스와이프로 이전 슬라이드로 이동해야 한다', () => {
    render(<BannerCarousel banners={mockBanners} />);

    const indicators = screen.getAllByRole('button', { name: /Go to slide/i });
    fireEvent.click(indicators[1]);
    expect(screen.getByText('2/2')).toBeInTheDocument();

    const carousel = document.querySelector('.overflow-hidden');
    fireEvent.touchStart(carousel!, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(carousel!, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(carousel!);

    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('첫 슬라이드에서 왼쪽 스와이프는 무시되어야 한다', () => {
    render(<BannerCarousel banners={mockBanners} />);

    const carousel = document.querySelector('.overflow-hidden');
    fireEvent.touchStart(carousel!, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(carousel!, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(carousel!);

    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('마지막 슬라이드에서 오른쪽 스와이프는 무시되어야 한다', () => {
    render(<BannerCarousel banners={mockBanners} />);

    const indicators = screen.getAllByRole('button', { name: /Go to slide/i });
    fireEvent.click(indicators[1]);

    const carousel = document.querySelector('.overflow-hidden');
    fireEvent.touchStart(carousel!, { touches: [{ clientX: 200 }] });
    fireEvent.touchMove(carousel!, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(carousel!);

    expect(screen.getByText('2/2')).toBeInTheDocument();
  });
});
