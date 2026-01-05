import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ANIMATION_DURATION = 300;
const DRAG_CLOSE_THRESHOLD = 100;

export const BottomSheet = ({ isOpen, onClose, children }: Props) => {
  const [isClosing, setIsClosing] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const shouldRender = isOpen || isClosing;

  useEffect(() => {
    if (isOpen && isClosing) {
      setIsClosing(false);
    }
  }, [isOpen, isClosing]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setDragY(0);
    closeTimeoutRef.current = setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, ANIMATION_DURATION);
  }, [isClosing, onClose]);

  // 드래그 시작
  const handleDragStart = useCallback((clientY: number) => {
    dragStartY.current = clientY;
    setIsDragging(true);
  }, []);

  // 드래그 중
  const handleDragMove = useCallback((clientY: number) => {
    if (!isDragging) return;
    const diff = clientY - dragStartY.current;
    // 아래로만 드래그 가능 (위로는 제한)
    if (diff > 0) {
      setDragY(diff);
    }
  }, [isDragging]);

  // 드래그 끝
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (dragY > DRAG_CLOSE_THRESHOLD) {
      handleClose();
    } else {
      setDragY(0);
    }
  }, [dragY, handleClose]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Mouse events (데스크톱 지원)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  }, [handleDragStart]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  useEffect(() => {
    if (shouldRender) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [shouldRender]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isClosing) {
        handleClose();
      }
    };

    if (shouldRender) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [shouldRender, isClosing, handleClose]);

  // 열릴 때 dragY 리셋
  useEffect(() => {
    if (isOpen) {
      setDragY(0);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const sheetTransform = isClosing
    ? 'translateY(100%)'
    : `translateY(${dragY}px)`;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      {/* Overlay */}
      <div
        onClick={isClosing ? undefined : handleClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/50"
        style={{
          opacity: isClosing ? 0 : Math.max(0, 1 - dragY / 300),
          transition: isDragging ? 'none' : 'opacity 300ms',
        }}
      />
      {/* Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl min-h-[60vh] max-h-[90vh]"
        style={{
          transform: sheetTransform,
          transition: isDragging ? 'none' : 'transform 300ms',
        }}
      >
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Handle - 드래그 영역 */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            className="sticky top-0 bg-white pt-3 pb-2 flex justify-center rounded-t-2xl cursor-grab touch-none"
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
