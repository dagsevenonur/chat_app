import { cn } from '@/lib/utils';
import { TextSize, TextWeight, TextAlign } from './TextTypes';
import { SIZE_MAP, WEIGHT_MAP, ALIGN_MAP, COLOR_MAP } from './constants';

export const getTextStyles = (
  size: TextSize,
  weight: TextWeight,
  align: TextAlign,
  color?: string,
  isItalic?: boolean,
  isUnderline?: boolean,
  isLineThrough?: boolean,
  isUppercase?: boolean,
  isLowercase?: boolean,
  isCapitalize?: boolean,
  noMargin?: boolean,
  truncate?: boolean,
  maxLines?: number,
  isClickable?: boolean,
  isDisabled?: boolean,
  className?: string
): string => {
  return cn(
    // Base styles
    'transition-colors',
    
    // Size and weight
    SIZE_MAP[size],
    WEIGHT_MAP[weight],
    
    // Alignment
    ALIGN_MAP[align],
    
    // Color
    color && (COLOR_MAP[color as keyof typeof COLOR_MAP] || color),
    
    // Text decoration
    isItalic && 'italic',
    isUnderline && 'underline',
    isLineThrough && 'line-through',
    
    // Text transform
    isUppercase && 'uppercase',
    isLowercase && 'lowercase',
    isCapitalize && 'capitalize',
    
    // Margin
    !noMargin && 'mb-2',
    
    // Truncate
    truncate && 'truncate',
    maxLines && `line-clamp-${maxLines}`,
    
    // Interactive states
    isClickable && !isDisabled && 'cursor-pointer hover:opacity-80',
    isDisabled && 'cursor-not-allowed opacity-50',
    
    // Custom classes
    className
  );
}; 