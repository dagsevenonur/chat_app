import { Component } from 'react';
import { CardDescriptionProps } from '../CardTypes';
import { getDescriptionStyles } from '../styles';

class CardDescription extends Component<CardDescriptionProps> {
  render() {
    const { className, children } = this.props;

    return (
      <p className={getDescriptionStyles(className)}>
        {children}
      </p>
    );
  }
}

export default CardDescription; 