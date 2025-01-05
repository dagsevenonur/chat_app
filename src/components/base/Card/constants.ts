export const DEFAULT_PROPS = {
  variant: 'default',
  size: 'md',
  isSelected: false,
  isDisabled: false,
  hasShadow: true,
  noPadding: false,
  fullWidth: false
} as const;

export const PADDING_MAP = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
} as const;

export const FOOTER_ALIGN_MAP = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
  around: 'justify-around'
} as const; 