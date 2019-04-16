import React, { Component } from 'react';

class SubmittedMsg extends Component {
  render() {
    return (
      <p style={{color:'#44C529', margin:'auto'}}>
        {this.props.children}
      </p>
    )
  }
}

export default SubmittedMsg;
