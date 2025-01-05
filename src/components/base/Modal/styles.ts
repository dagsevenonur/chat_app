import { cn } from '@/lib/utils';
import { ModalSize, ModalPosition } from './ModalTypes';
import { SIZE_MAP, POSITION_MAP } from './constants';

export const getOverlayStyles = (
  hasOverlay: boolean,
  isClosing: boolean,
  overlayClassName?: string
): string => {
  return cn(
    // Base styles
    'fixed inset-0 z-50 flex justify-center overflow-y-auto',
    
    // Overlay background
    hasOverlay && 'bg-background/80 backdrop-blur-sm',
    
    // Animation
    'transition-opacity duration-200',
    isClosing ? 'opacity-0' : 'opacity-100',
    
    // Custom classes
    overlayClassName
  );
};

export const getModalStyles = (
  size: ModalSize,
  position: ModalPosition,
  isClosing: boolean,
  noPadding: boolean,
  className?: string
): string => {
  return cn(
    // Base styles
    'relative w-full',
    
    // Size
    SIZE_MAP[size],
    
    // Position
    POSITION_MAP[position],
    
    // Padding
    !noPadding && 'p-6',
    
    // Visual styles
    'bg-background shadow-lg',
    'rounded-lg border',
    
    // Animation
    'transition-all duration-200',
    isClosing
      ? 'translate-y-4 scale-95 opacity-0'
      : 'translate-y-0 scale-100 opacity-100',
    
    // Custom classes
    className
  );
}; 