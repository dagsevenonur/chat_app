import { Component } from 'react';

interface InputLabelProps {
  label: string;
  isRequired?: boolean;
}

class InputLabel extends Component<InputLabelProps> {
  render() {
    const { label, isRequired } = this.props;

    return (
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        {isRequired && <span className="text-destructive">*</span>}
      </label>
    );
  }
}

export default InputLabel; 