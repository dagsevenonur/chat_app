import { Component } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ModalProps, ModalState } from './ModalTypes';
import { getModalStyles, getOverlayStyles } from './styles';
import { DEFAULT_PROPS, ANIMATION_DURATION } from './constants';

class Modal extends Component<ModalProps, ModalState> {
  static defaultProps = DEFAULT_PROPS;

  state: ModalState = {
    isClosing: false
  };

  private closeTimeout: NodeJS.Timeout | null = null;

  componentDidMount() {
    if (this.props.closeOnEscape) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }

  componentDidUpdate(prevProps: ModalProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      document.body.style.overflow = 'hidden';
    } else if (prevProps.isOpen && !this.props.isOpen) {
      document.body.style.overflow = '';
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === 'Escape' &&
      this.props.isOpen &&
      !this.props.preventClose &&
      this.props.closeOnEscape
    ) {
      this.handleClose();
    }
  };

  private handleOverlayClick = (event: React.MouseEvent) => {
    if (
      event.target === event.currentTarget &&
      !this.props.preventClose &&
      this.props.closeOnOverlayClick
    ) {
      this.handleClose();
    }
  };

  private handleClose = () => {
    const { onClose } = this.props;

    this.setState({ isClosing: true });
    this.closeTimeout = setTimeout(() => {
      this.setState({ isClosing: false });
      onClose();
    }, ANIMATION_DURATION);
  };

  render() {
    const {
      isOpen,
      size,
      position,
      className,
      children,
      title,
      description,
      showCloseButton,
      hasOverlay,
      overlayClassName,
      noPadding
    } = this.props;

    const { isClosing } = this.state;

    if (!isOpen && !isClosing) return null;

    return createPortal(
      <div
        className={getOverlayStyles(hasOverlay!, isClosing, overlayClassName)}
        onClick={this.handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        <div
          className={getModalStyles(
            size!,
            position!,
            isClosing,
            noPadding!,
            className
          )}
        >
          {showCloseButton && (
            <button
              type="button"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              onClick={this.handleClose}
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {title && (
            <div className="mb-4">
              <h2
                id="modal-title"
                className="text-lg font-semibold leading-none tracking-tight"
              >
                {title}
              </h2>
              {description && (
                <p
                  id="modal-description"
                  className="mt-1.5 text-sm text-muted-foreground"
                >
                  {description}
                </p>
              )}
            </div>
          )}

          {children}
        </div>
      </div>,
      document.body
    );
  }
}

export default Modal; 