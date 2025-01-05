export const DEFAULT_PROPS = {
  variant: 'p',
  size: 'base',
  weight: 'normal',
  align: 'left',
  isItalic: false,
  isUnderline: false,
  isLineThrough: false,
  isUppercase: false,
  isLowercase: false,
  isCapitalize: false,
  noMargin: false,
  truncate: false,
  isClickable: false,
  isDisabled: false
} as const;

export const SIZE_MAP = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl'
} as const;

export const WEIGHT_MAP = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
} as const;

export const ALIGN_MAP = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify'
} as const;

export const COLOR_MAP = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  muted: 'text-muted-foreground',
  destructive: 'text-destructive'
} as const; 