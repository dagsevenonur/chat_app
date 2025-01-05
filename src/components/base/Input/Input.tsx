import { Component } from 'react';
import { InputProps, InputState } from './InputTypes';
import { getBaseStyles, getWrapperStyles } from './styles';
import { DEFAULT_PROPS } from './constants';

import {
  InputLabel,
  InputIcon,
  InputHelperText,
  PasswordToggle,
  ClearButton,
  LoadingSpinner
} from './components';

class Input extends Component<InputProps, InputState> {
  static defaultProps = DEFAULT_PROPS;

  constructor(props: InputProps) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  private togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  render() {
    const {
      // Temel özellikler
      type,
      value,
      defaultValue,
      placeholder,
      size,
      status,
      isDisabled,
      isLoading,
      isRequired,
      autoFocus,
      className,

      // Label ve yardımcı metinler
      label,
      helperText,
      errorMessage,
      successMessage,

      // İkonlar ve aksesuarlar
      leftIcon,
      rightIcon,
      showClearButton,
      showPasswordToggle,

      // Event handlers
      onChange,
      onFocus,
      onBlur,
      onClear
    } = this.props;

    const { showPassword } = this.state;
    const actualType = type === 'password' && showPassword ? 'text' : type;
    const hasValue = value !== undefined && value !== '';

    return (
      <div className="w-full space-y-2">
        {label && (
          <InputLabel label={label} isRequired={isRequired} />
        )}

        <div className={getWrapperStyles(isDisabled)}>
          {leftIcon && <InputIcon icon={leftIcon} position="left" />}

          <input
            type={actualType}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={isDisabled}
            required={isRequired}
            autoFocus={autoFocus}
            className={getBaseStyles(size!, status!, !!leftIcon, !!rightIcon, className)}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />

          {rightIcon && !showClearButton && !showPasswordToggle && (
            <InputIcon icon={rightIcon} position="right" />
          )}

          {type === 'password' && showPasswordToggle && (
            <PasswordToggle
              show={showPassword}
              onToggle={this.togglePasswordVisibility}
            />
          )}

          {showClearButton && hasValue && (
            <ClearButton onClear={onClear!} />
          )}

          {isLoading && <LoadingSpinner />}
        </div>

        <InputHelperText
          helperText={helperText}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </div>
    );
  }
}

export default Input; 