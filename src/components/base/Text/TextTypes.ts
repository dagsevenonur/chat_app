import { ReactNode } from 'react';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'blockquote';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface TextProps {
  // Temel özellikler
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  className?: string;
  children: ReactNode;

  // Renk ve görünüm
  color?: string;
  isItalic?: boolean;
  isUnderline?: boolean;
  isLineThrough?: boolean;
  isUppercase?: boolean;
  isLowercase?: boolean;
  isCapitalize?: boolean;

  // Boşluk ve kenar
  noMargin?: boolean;
  truncate?: boolean;
  maxLines?: number;

  // İnteraktif
  isClickable?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
} 