import { Component } from 'react';
import { AvatarProps, AvatarState } from './AvatarTypes';
import { getAvatarStyles } from './styles';
import { DEFAULT_PROPS } from './constants';
import { AvatarFallback, AvatarStatus } from './components';

class Avatar extends Component<AvatarProps, AvatarState> {
  static defaultProps = DEFAULT_PROPS;

  constructor(props: AvatarProps) {
    super(props);
    this.state = {
      hasError: false,
      isLoading: true
    };
  }

  private handleImageLoad = () => {
    this.setState({ isLoading: false });
  };

  private handleImageError = () => {
    this.setState({ hasError: true, isLoading: false });
  };

  private handleClick = () => {
    const { onClick, isDisabled, isClickable } = this.props;
    if (isClickable && !isDisabled && onClick) {
      onClick();
    }
  };

  render() {
    const {
      src,
      alt,
      size,
      className,
      fallback,
      fallbackText,
      status,
      isClickable,
      isDisabled,
      hasBorder,
      isSquare,
      hasRing
    } = this.props;

    const { hasError, isLoading } = this.state;
    const showFallback = !src || hasError || isLoading;

    return (
      <div
        className={getAvatarStyles(
          size!,
          isClickable!,
          isDisabled!,
          hasBorder!,
          isSquare!,
          hasRing!,
          className
        )}
        onClick={this.handleClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable && !isDisabled ? 0 : undefined}
        aria-disabled={isDisabled}
      >
        {!showFallback && (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onLoad={this.handleImageLoad}
            onError={this.handleImageError}
          />
        )}

        {showFallback && (
          <AvatarFallback
            size={size!}
            fallback={fallback}
            fallbackText={fallbackText}
          />
        )}

        {status && <AvatarStatus status={status} />}
      </div>
    );
  }
}

export default Avatar; 