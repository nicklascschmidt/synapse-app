import React, { Component } from 'react';
import { Card } from 'reactstrap';

const cardStyle = {
  backgroundColor: '#62656B',
  padding: '1rem',
  margin: '.5rem',
}

class CardComponent extends Component {
  render() {
    return (
      <Card style={cardStyle}>
        {this.props.children}
      </Card>
    )
  }
}

export default CardComponent;
