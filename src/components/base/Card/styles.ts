import { cn } from '@/lib/utils';
import { CardVariant, CardSize } from './CardTypes';
import { PADDING_MAP, FOOTER_ALIGN_MAP } from './constants';

export const getCardStyles = (
  variant: CardVariant,
  size: CardSize,
  isSelected: boolean,
  isDisabled: boolean,
  hasShadow: boolean,
  noPadding: boolean,
  fullWidth: boolean,
  className?: string
): string => {
  return cn(
    // Base styles
    'rounded-lg border bg-card text-card-foreground',
    'transition-colors duration-200',
    
    // Variant styles
    getVariantStyles(variant, isSelected),
    
    // Size and padding
    !noPadding && PADDING_MAP[size],
    
    // Shadow
    hasShadow && 'shadow-sm',
    
    // Width
    fullWidth ? 'w-full' : 'w-auto',
    
    // Interactive states
    isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    
    // Custom classes
    className
  );
};

export const getVariantStyles = (variant: CardVariant, isSelected: boolean): string => {
  switch (variant) {
    case 'hoverable':
      return 'hover:border-primary/50 hover:bg-accent';
    case 'selectable':
      return cn(
        'cursor-pointer',
        isSelected
          ? 'border-primary bg-accent'
          : 'hover:border-primary/50 hover:bg-accent'
      );
    case 'interactive':
      return 'cursor-pointer active:scale-[0.98] hover:border-primary/50';
    case 'bordered':
      return 'border-2';
    default:
      return '';
  }
};

export const getHeaderStyles = (className?: string): string => {
  return cn('flex flex-col space-y-1.5', className);
};

export const getTitleStyles = (className?: string): string => {
  return cn('text-2xl font-semibold leading-none tracking-tight', className);
};

export const getDescriptionStyles = (className?: string): string => {
  return cn('text-sm text-muted-foreground', className);
};

export const getContentStyles = (noPadding?: boolean, className?: string): string => {
  return cn(
    'flex flex-col',
    !noPadding && 'pt-6',
    className
  );
};

export const getFooterStyles = (align: string = 'left', className?: string): string => {
  return cn(
    'flex items-center',
    FOOTER_ALIGN_MAP[align as keyof typeof FOOTER_ALIGN_MAP],
    'pt-6',
    className
  );
}; 