import { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPosition = 'center' | 'top';

export interface ModalProps {
  // Temel özellikler
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  position?: ModalPosition;
  className?: string;
  children: ReactNode;

  // Başlık özellikleri
  title?: ReactNode;
  description?: ReactNode;

  // İnteraktif özellikler
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventClose?: boolean;
  showCloseButton?: boolean;

  // Görsel özellikler
  overlayClassName?: string;
  hasOverlay?: boolean;
  noPadding?: boolean;
}

export interface ModalState {
  isClosing: boolean;
} 