import { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  // Temel özellikler
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: ReactNode;

  // İkon özellikleri
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  // İnteraktif özellikler
  isDismissible?: boolean;
  onDismiss?: () => void;
  isDisabled?: boolean;

  // Görsel özellikler
  isRounded?: boolean;
  hasDot?: boolean;
  dotColor?: string;
  hasGlow?: boolean;
} 