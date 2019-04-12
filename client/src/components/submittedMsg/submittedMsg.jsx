import React, { Component } from 'react';

class SubmittedMsg extends Component {
  render() {
    return (
      <p style={{color:'green'}}>
        {this.props.children}
      </p>
    )
  }
}

export default SubmittedMsg;
