import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BottomSheet } from './BottomSheet';

describe('BottomSheet', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('isOpen이 false면 렌더링되지 않아야 한다', () => {
    render(
      <BottomSheet isOpen={false} onClose={mockOnClose}>
        <div>Sheet Content</div>
      </BottomSheet>
    );

    expect(screen.queryByText('Sheet Content')).not.toBeInTheDocument();
  });

  it('isOpen이 true면 렌더링되어야 한다', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Sheet Content</div>
      </BottomSheet>
    );

    expect(screen.getByText('Sheet Content')).toBeInTheDocument();
  });

  it('배경 클릭 시 onClose가 호출되어야 한다', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Sheet Content</div>
      </BottomSheet>
    );

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('시트 콘텐츠 클릭 시 onClose가 호출되지 않아야 한다', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Sheet Content</div>
      </BottomSheet>
    );

    fireEvent.click(screen.getByText('Sheet Content'));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('Escape 키 입력 시 onClose가 호출되어야 한다', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Sheet Content</div>
      </BottomSheet>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('aria-modal 속성이 true여야 한다', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Sheet Content</div>
      </BottomSheet>
    );

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('드래그 핸들이 표시되어야 한다', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Sheet Content</div>
      </BottomSheet>
    );

    const handle = document.querySelector('.w-10.h-1.bg-gray-300');
    expect(handle).toBeInTheDocument();
  });
});
