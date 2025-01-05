import { cn } from '@/lib/utils';
import { InputSize, InputStatus } from './InputTypes';

export const getBaseStyles = (
  size: InputSize,
  status: InputStatus,
  hasLeftIcon?: boolean,
  hasRightIcon?: boolean,
  className?: string
): string => {
  return cn(
    'flex w-full rounded-md border bg-background px-3 text-foreground transition-colors',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    getSizeStyles(size),
    getStatusStyles(status),
    hasLeftIcon && 'pl-10',
    hasRightIcon && 'pr-10',
    className
  );
};

export const getWrapperStyles = (isDisabled?: boolean): string => {
  return cn(
    'relative w-full',
    isDisabled && 'cursor-not-allowed opacity-50'
  );
};

export const getSizeStyles = (size: InputSize): string => {
  switch (size) {
    case 'sm':
      return 'h-8 text-sm';
    case 'lg':
      return 'h-12 text-lg';
    default:
      return 'h-10 text-base';
  }
};

export const getStatusStyles = (status: InputStatus): string => {
  switch (status) {
    case 'error':
      return 'border-destructive focus-visible:ring-destructive/50';
    case 'success':
      return 'border-green-500 focus-visible:ring-green-500/50';
    default:
      return 'border-input';
  }
}; 