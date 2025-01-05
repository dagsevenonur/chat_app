import { Component } from 'react';
import { cn } from '@/lib/utils';

interface InputHelperTextProps {
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
}

class InputHelperText extends Component<InputHelperTextProps> {
  render() {
    const { helperText, errorMessage, successMessage } = this.props;

    if (!helperText && !errorMessage && !successMessage) return null;

    return (
      <p
        className={cn(
          'text-sm',
          errorMessage && 'text-destructive',
          successMessage && 'text-green-500',
          !errorMessage && !successMessage && 'text-muted-foreground'
        )}
      >
        {errorMessage || successMessage || helperText}
      </p>
    );
  }
}

export default InputHelperText; 