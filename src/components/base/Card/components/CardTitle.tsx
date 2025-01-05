import { Component } from 'react';
import { CardTitleProps } from '../CardTypes';
import { getTitleStyles } from '../styles';

class CardTitle extends Component<CardTitleProps> {
  render() {
    const { className, children } = this.props;

    return (
      <h3 className={getTitleStyles(className)}>
        {children}
      </h3>
    );
  }
}

export default CardTitle; 