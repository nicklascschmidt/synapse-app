import React, { Component } from 'react';
import axios from 'axios';
import Error from '../error/error';
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      userId: '5cad5098eaf3f30067380c7c',
      error: null,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.tryUserLogin(this.state);
  }

  tryUserLogin = (state) => {
    let { userId } = state;
    axios
      .get(`/login/${userId}`)
      .then( resp => {
        console.log('resp',resp);
        console.log('welcome~',resp.data.legal_names[0]);
        // save userId and name into Redux -- more stuff too?
      })
      .catch( err => {
        this.setState({ error: 'Unable to locate account. Please try another User ID'});
      });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>User ID:</Label>
            <Input
              style={{width:'20rem',margin:'auto'}}
              type="text"
              value={this.state.userId}
              onChange={e => this.setState({ userId: e.target.value })}
            />
          </FormGroup>
          <Button type="submit" style={{display:'block',margin:'auto'}}>Submit</Button>
        </Form>
        <Error>{this.state.error && this.state.error}</Error>
      </div>
    )
  }
}

export default Login;
