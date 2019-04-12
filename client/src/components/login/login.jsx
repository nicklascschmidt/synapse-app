import React, { Component } from 'react';
import { connect } from "react-redux";
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
    // Get user from the API with userId.
    // If the user exists (userId), send user data to Redux and reroute page to Main. Else, show error.
    let { userId } = state;
    axios
      .get(`/user/login/${userId}`)
      .then(resp => {
        if (resp.status === 200) {
          let name = resp.data.legal_names[0];
          this.sendToRedux(name, userId, this.reroutePage);
        } else {
          this.setState({ error: 'Connection error. Please try again.' });
        }
      })
      .catch(err => {
        this.setState({ error: 'Unable to locate account. Please try another User ID.' });
      });
  }

  reroutePage = () => {
    window.location = '/main';
  }

  sendToRedux = (name, userId, rerouteCB) => {
    let userData = { name, userId, isLoggedIn: true };
    this.props.dispatch({
      type: "USER_LOGIN_REQUEST",
      payload: userData
    });
    rerouteCB();
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>User ID:</Label>
            <Input
              style={{ width: '20rem', margin: 'auto' }}
              type="text"
              value={this.state.userId}
              onChange={e => this.setState({ userId: e.target.value })}
            />
          </FormGroup>
          <Button type="submit" style={{ display: 'block', margin: 'auto' }}>Submit</Button>
        </Form>
        <Error>{this.state.error && this.state.error}</Error>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    name: state.name,
    userId: state.userId,
    isLoggedIn: state.isLoggedIn
  };
}

export default connect(mapStateToProps)(Login);
