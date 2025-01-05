import { Component } from 'react';
import { BadgeProps } from './BadgeTypes';
import { getBadgeStyles, getDotStyles } from './styles';
import { DEFAULT_PROPS } from './constants';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

class Badge extends Component<BadgeProps> {
  static defaultProps = DEFAULT_PROPS;

  private handleDismiss = (event: React.MouseEvent) => {
    event.stopPropagation();
    const { onDismiss, isDisabled } = this.props;
    if (!isDisabled && onDismiss) {
      onDismiss();
    }
  };

  render() {
    const {
      variant,
      size,
      className,
      children,
      leftIcon,
      rightIcon,
      isDismissible,
      isDisabled,
      isRounded,
      hasDot,
      dotColor,
      hasGlow
    } = this.props;

    return (
      <div
        className={getBadgeStyles(
          variant!,
          size!,
          isRounded!,
          hasDot!,
          hasGlow!,
          isDisabled!,
          className
        )}
      >
        {hasDot && (
          <span className={getDotStyles(dotColor)} />
        )}

        {leftIcon && (
          <span className="shrink-0">
            {leftIcon}
          </span>
        )}

        <span>{children}</span>

        {rightIcon && !isDismissible && (
          <span className="shrink-0">
            {rightIcon}
          </span>
        )}

        {isDismissible && (
          <button
            type="button"
            className={cn(
              'shrink-0 rounded-full p-0.5',
              'hover:bg-background/20',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              isDisabled && 'pointer-events-none'
            )}
            onClick={this.handleDismiss}
            disabled={isDisabled}
            aria-label="Dismiss"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }
}

export default Badge; 