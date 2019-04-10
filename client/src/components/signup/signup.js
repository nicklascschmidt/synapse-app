import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  }

  render() {
    return (
      <div>
        <h3>Signup</h3>
        <form onSubmit={this.handleSubmit}>
          <p>Username:</p>
          <input
            type="text"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <p>Password:</p>
          <input
            type="text"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit" style={{display:'block',margin:'auto'}}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Signup;
