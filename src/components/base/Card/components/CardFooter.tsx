import { Component } from 'react';
import { CardFooterProps } from '../CardTypes';
import { getFooterStyles } from '../styles';

class CardFooter extends Component<CardFooterProps> {
  render() {
    const { className, children, align = 'left' } = this.props;

    return (
      <div className={getFooterStyles(align, className)}>
        {children}
      </div>
    );
  }
}

export default CardFooter; 