import { Component } from 'react';
import { CardHeaderProps } from '../CardTypes';
import { getHeaderStyles } from '../styles';

class CardHeader extends Component<CardHeaderProps> {
  render() {
    const { className, children } = this.props;

    return (
      <div className={getHeaderStyles(className)}>
        {children}
      </div>
    );
  }
}

export default CardHeader; 