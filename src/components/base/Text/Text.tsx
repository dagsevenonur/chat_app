import { Component } from 'react';
import { TextProps } from './TextTypes';
import { getTextStyles } from './styles';
import { DEFAULT_PROPS } from './constants';

class Text extends Component<TextProps> {
  static defaultProps = DEFAULT_PROPS;

  private handleClick = () => {
    const { onClick, isDisabled, isClickable } = this.props;
    if (isClickable && !isDisabled && onClick) {
      onClick();
    }
  };

  render() {
    const {
      variant,
      size,
      weight,
      align,
      color,
      className,
      children,
      isItalic,
      isUnderline,
      isLineThrough,
      isUppercase,
      isLowercase,
      isCapitalize,
      noMargin,
      truncate,
      maxLines,
      isClickable,
      isDisabled,
      onClick
    } = this.props;

    const Element = variant!;
    const styles = getTextStyles(
      size!,
      weight!,
      align!,
      color,
      isItalic,
      isUnderline,
      isLineThrough,
      isUppercase,
      isLowercase,
      isCapitalize,
      noMargin,
      truncate,
      maxLines,
      isClickable,
      isDisabled,
      className
    );

    return (
      <Element
        className={styles}
        onClick={onClick ? this.handleClick : undefined}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable && !isDisabled ? 0 : undefined}
        aria-disabled={isDisabled}
      >
        {children}
      </Element>
    );
  }
}

export default Text; 