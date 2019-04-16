import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <p style={{color:'#FF6666'}}>
        {this.props.children}
      </p>
    )
  }
}

export default Error;
