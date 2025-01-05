import { Component } from 'react';
import { AvatarStatus as StatusType } from '../AvatarTypes';
import { getStatusStyles } from '../styles';

interface AvatarStatusProps {
  status: StatusType;
}

class AvatarStatus extends Component<AvatarStatusProps> {
  render() {
    const { status } = this.props;

    return (
      <span
        className={getStatusStyles(status)}
        role="status"
        aria-label={`Status: ${status}`}
      />
    );
  }
}

export default AvatarStatus; 