import { Component } from 'react';
import { ButtonProps, ButtonState } from './ButtonTypes';
import { cn } from '@/lib/utils';

class Button extends Component<ButtonProps, ButtonState> {
  static defaultProps = {
    variant: 'primary',
    size: 'md',
    isLoading: false,
    isDisabled: false,
    type: 'button'
  };

  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      isPressed: false
    };
  }

  private getBaseStyles(): string {
    return cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      this.getVariantStyles(),
      this.getSizeStyles(),
      this.props.className
    );
  }

  private getVariantStyles(): string {
    switch (this.props.variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
      case 'outline':
        return 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
      case 'ghost':
        return 'hover:bg-accent hover:text-accent-foreground';
      case 'destructive':
        return 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
      default:
        return '';
    }
  }

  private getSizeStyles(): string {
    switch (this.props.size) {
      case 'sm':
        return 'h-9 px-3 text-sm';
      case 'lg':
        return 'h-11 px-8 text-lg';
      default:
        return 'h-10 px-4 text-base';
    }
  }

  private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { onClick, isDisabled, isLoading } = this.props;
    if (isDisabled || isLoading) return;
    onClick?.(event);
  };

  render() {
    const {
      children,
      isLoading,
      isDisabled,
      leftIcon,
      rightIcon,
      type
    } = this.props;

    return (
      <button
        type={type}
        className={this.getBaseStyles()}
        disabled={isDisabled || isLoading}
        onClick={this.handleClick}
        aria-disabled={isDisabled || isLoading}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
}

export default Button; 