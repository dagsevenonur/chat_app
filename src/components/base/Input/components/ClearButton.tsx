import { Component } from 'react';
import { X } from 'lucide-react';

interface ClearButtonProps {
  onClear: () => void;
}

class ClearButton extends Component<ClearButtonProps> {
  render() {
    return (
      <button
        type="button"
        onClick={this.props.onClear}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    );
  }
}

export default ClearButton; 