export const DEFAULT_PROPS = {
  size: 'md',
  isClickable: false,
  isDisabled: false,
  hasBorder: false,
  isSquare: false,
  hasRing: false
} as const;

export const SIZE_MAP = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-14 w-14 text-xl'
} as const;

export const STATUS_MAP = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500'
} as const; 