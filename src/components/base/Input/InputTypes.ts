import { ReactNode, ChangeEvent, FocusEvent } from 'react';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'normal' | 'error' | 'success';

export interface InputProps {
  // Temel özellikler
  type?: InputType;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  size?: InputSize;
  status?: InputStatus;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  autoFocus?: boolean;
  className?: string;

  // Label ve yardımcı metinler
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;

  // İkonlar ve aksesuarlar
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;

  // Event handlers
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export interface InputState {
  showPassword: boolean;
} 