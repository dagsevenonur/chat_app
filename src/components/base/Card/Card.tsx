import { Component } from 'react';
import { CardProps } from './CardTypes';
import { getCardStyles } from './styles';
import { DEFAULT_PROPS } from './constants';

class Card extends Component<CardProps> {
  static defaultProps = DEFAULT_PROPS;

  private handleClick = () => {
    const { onClick, isDisabled } = this.props;
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  render() {
    const {
      variant,
      size,
      className,
      children,
      isSelected,
      isDisabled,
      hasShadow,
      noPadding,
      fullWidth,
      onClick
    } = this.props;

    return (
      <div
        className={getCardStyles(
          variant!,
          size!,
          isSelected!,
          isDisabled!,
          hasShadow!,
          noPadding!,
          fullWidth!,
          className
        )}
        onClick={onClick ? this.handleClick : undefined}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick && !isDisabled ? 0 : undefined}
      >
        {children}
      </div>
    );
  }
}

export default Card; 