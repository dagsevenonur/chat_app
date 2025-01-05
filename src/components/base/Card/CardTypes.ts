import { ReactNode } from 'react';

export type CardVariant = 'default' | 'hoverable' | 'selectable' | 'interactive' | 'bordered';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  // Temel özellikler
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  children: ReactNode;

  // İnteraktif özellikler
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;

  // Görsel özellikler
  hasShadow?: boolean;
  noPadding?: boolean;
  fullWidth?: boolean;
}

export interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

export interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

export interface CardDescriptionProps {
  className?: string;
  children: ReactNode;
}

export interface CardContentProps {
  className?: string;
  children: ReactNode;
  noPadding?: boolean;
}

export interface CardFooterProps {
  className?: string;
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'between' | 'around';
} 