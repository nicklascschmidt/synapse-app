import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <p style={{color:'red'}}>
        {this.props.children}
      </p>
    )
  }
}

export default Error;
