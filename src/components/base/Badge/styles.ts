import { cn } from '@/lib/utils';
import { BadgeVariant, BadgeSize } from './BadgeTypes';
import { SIZE_MAP, VARIANT_MAP, DOT_COLORS } from './constants';

export const getBadgeStyles = (
  variant: BadgeVariant,
  size: BadgeSize,
  isRounded: boolean,
  hasDot: boolean,
  hasGlow: boolean,
  isDisabled: boolean,
  className?: string
): string => {
  return cn(
    // Base styles
    'inline-flex items-center gap-1 font-medium transition-colors',
    
    // Size
    SIZE_MAP[size],
    
    // Variant
    VARIANT_MAP[variant],
    
    // Shape
    isRounded && 'rounded-full',
    !isRounded && 'rounded-md',
    
    // Dot spacing
    hasDot && 'pl-1.5',
    
    // Glow effect
    hasGlow && 'shadow-[0_0_10px_3px] shadow-current/25',
    
    // Interactive states
    isDisabled && 'cursor-not-allowed opacity-50',
    
    // Custom classes
    className
  );
};

export const getDotStyles = (color?: string): string => {
  return cn(
    'h-2 w-2 rounded-full',
    color && (DOT_COLORS[color as keyof typeof DOT_COLORS] || color)
  );
}; 