import { Component } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordToggleProps {
  show: boolean;
  onToggle: () => void;
}

class PasswordToggle extends Component<PasswordToggleProps> {
  render() {
    const { show, onToggle } = this.props;

    return (
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {show ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    );
  }
}

export default PasswordToggle; 