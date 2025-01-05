import { ReactNode } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps {
  // Temel özellikler
  src?: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;

  // Fallback özellikler
  fallback?: ReactNode;
  fallbackText?: string;

  // Durum özelliği
  status?: AvatarStatus;

  // İnteraktif özellikler
  isClickable?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;

  // Görsel özellikler
  hasBorder?: boolean;
  isSquare?: boolean;
  hasRing?: boolean;
}

export interface AvatarState {
  hasError: boolean;
  isLoading: boolean;
} 