export const DEFAULT_PROPS = {
  size: 'md',
  position: 'center',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  preventClose: false,
  showCloseButton: true,
  hasOverlay: true,
  noPadding: false
} as const;

export const SIZE_MAP = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[calc(100vw-2rem)]'
} as const;

export const POSITION_MAP = {
  center: 'items-center',
  top: 'items-start pt-16'
} as const;

export const ANIMATION_DURATION = 200; // ms 