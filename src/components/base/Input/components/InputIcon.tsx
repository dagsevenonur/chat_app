import { Component, ReactNode } from 'react';

interface InputIconProps {
  icon: ReactNode;
  position: 'left' | 'right';
}

class InputIcon extends Component<InputIconProps> {
  render() {
    const { icon, position } = this.props;

    return (
      <div
        className={`absolute ${
          position === 'left' ? 'left-3' : 'right-3'
        } top-1/2 -translate-y-1/2 text-muted-foreground`}
      >
        {icon}
      </div>
    );
  }
}

export default InputIcon; 