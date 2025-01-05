import { cn } from '@/lib/utils';
import { AvatarSize, AvatarStatus } from './AvatarTypes';
import { SIZE_MAP, STATUS_MAP } from './constants';

export const getAvatarStyles = (
  size: AvatarSize,
  isClickable: boolean,
  isDisabled: boolean,
  hasBorder: boolean,
  isSquare: boolean,
  hasRing: boolean,
  className?: string
): string => {
  return cn(
    // Base styles
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-muted',
    
    // Size
    SIZE_MAP[size],
    
    // Shape
    !isSquare && 'rounded-full',
    isSquare && 'rounded-md',
    
    // Border
    hasBorder && 'border-2 border-background',
    
    // Ring
    hasRing && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
    
    // Interactive states
    isClickable && !isDisabled && 'cursor-pointer hover:opacity-90',
    isDisabled && 'cursor-not-allowed opacity-50',
    
    // Custom classes
    className
  );
};

export const getStatusStyles = (status: AvatarStatus): string => {
  return cn(
    'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background',
    STATUS_MAP[status]
  );
};

export const getFallbackStyles = (size: AvatarSize): string => {
  return cn(
    'flex h-full w-full items-center justify-center rounded-full bg-muted',
    SIZE_MAP[size]
  );
}; 