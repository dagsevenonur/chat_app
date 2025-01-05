import { Component } from 'react';
import { CardContentProps } from '../CardTypes';
import { getContentStyles } from '../styles';

class CardContent extends Component<CardContentProps> {
  render() {
    const { className, children, noPadding } = this.props;

    return (
      <div className={getContentStyles(noPadding, className)}>
        {children}
      </div>
    );
  }
}

export default CardContent; 