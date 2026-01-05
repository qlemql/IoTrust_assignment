import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesList } from './FavoritesList';
import { useFavoritesStore } from '../../stores/favoritesStore';

const mockFavorites = [
  {
    id: 'fav-1',
    name: 'Test Site 1',
    url: 'https://test1.com',
    iconUrl: '/icon1.png',
  },
  {
    id: 'fav-2',
    name: 'Test Site 2',
    url: 'https://test2.com',
    iconUrl: '/icon2.png',
  },
];

describe('FavoritesList', () => {
  beforeEach(() => {
    vi.stubGlobal('open', vi.fn());
    useFavoritesStore.setState({ favorites: mockFavorites });
  });

  it('로딩 중이면 스켈레톤이 표시되어야 한다', () => {
    render(<FavoritesList isLoading={true} />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('즐겨찾기 목록이 렌더링되어야 한다', () => {
    render(<FavoritesList />);
    expect(screen.getByText('Test Site 1')).toBeInTheDocument();
    expect(screen.getByText('Test Site 2')).toBeInTheDocument();
  });

  it('섹션 헤더가 표시되어야 한다', () => {
    render(<FavoritesList />);
    expect(screen.getByText('즐겨찾기')).toBeInTheDocument();
  });

  it('즐겨찾기가 없으면 빈 상태 메시지가 표시되어야 한다', () => {
    useFavoritesStore.setState({ favorites: [] });
    render(<FavoritesList />);
    expect(screen.getByText('즐겨찾기가 없습니다')).toBeInTheDocument();
  });

  it('아이템 클릭 시 URL이 열려야 한다', () => {
    render(<FavoritesList />);
    const item = screen.getByText('Test Site 1').closest('div[class*="cursor-pointer"]');
    fireEvent.click(item!);
    expect(window.open).toHaveBeenCalledWith(
      'https://test1.com',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('삭제 버튼 클릭 시 확인 모달이 열려야 한다', () => {
    render(<FavoritesList />);
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);
    expect(screen.getByText('즐겨찾기 삭제')).toBeInTheDocument();
  });

  it('삭제 확인 시 즐겨찾기가 삭제되어야 한다', () => {
    render(<FavoritesList />);

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);

    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);

    expect(screen.queryByText('Test Site 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Site 2')).toBeInTheDocument();
  });

  it('삭제 취소 시 즐겨찾기가 유지되어야 한다', () => {
    render(<FavoritesList />);

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);

    const cancelButton = screen.getByText('취소');
    fireEvent.click(cancelButton);

    expect(screen.getByText('Test Site 1')).toBeInTheDocument();
  });
});
