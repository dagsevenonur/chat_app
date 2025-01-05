import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
  children?: React.ReactNode;
}

const Text = forwardRef<HTMLDivElement, TextProps>(
  (
    {
      variant = 'p',
      size = 'base',
      weight = 'normal',
      color = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = variant;

    const styles = cn(
      // Base
      'text-gray-900',

      // Sizes
      {
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-base': size === 'base',
        'text-lg': size === 'lg',
        'text-xl': size === 'xl',
        'text-2xl': size === '2xl',
        'text-3xl': size === '3xl',
      },

      // Weights
      {
        'font-normal': weight === 'normal',
        'font-medium': weight === 'medium',
        'font-semibold': weight === 'semibold',
        'font-bold': weight === 'bold',
      },

      // Colors
      {
        'text-gray-900': color === 'default',
        'text-gray-500': color === 'muted',
        'text-blue-600': color === 'primary',
        'text-green-600': color === 'success',
        'text-yellow-600': color === 'warning',
        'text-red-600': color === 'error',
      },

      className
    );

    return (
      <div ref={ref} {...props}>
        <Component className={styles}>{children}</Component>
      </div>
    );
  }
);

Text.displayName = 'Text';

export { Text }; 