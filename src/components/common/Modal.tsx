import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ANIMATION_DURATION = 200;

export const Modal = ({ isOpen, onClose, children }: Props) => {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    closeTimeoutRef.current = setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, ANIMATION_DURATION);
  }, [isClosing, onClose]);

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

  if (!shouldRender) return null;

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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: isClosing ? 0 : 1,
          transition: 'opacity 200ms',
        }}
      />
      {/* Modal Content */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '384px',
            overflow: 'hidden',
            pointerEvents: 'auto',
            opacity: isClosing ? 0 : 1,
            transform: isClosing ? 'scale(0.95)' : 'scale(1)',
            transition: 'opacity 200ms, transform 200ms',
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
