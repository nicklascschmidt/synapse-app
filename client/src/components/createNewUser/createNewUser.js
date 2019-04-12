import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import Error from '../error/error';

class CreateNewUser extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      error: null,
    }
  }

  // Validate input on submit. If valid, create a new user with that name (and clear the error). Else, show error.
  handleSubmit = (e) => {
    e.preventDefault();

    let isValid = this.validateUserInput(this.state.name);
    console.log(isValid);
    if (isValid) {
      this.setState({ error: null });
      this.createNewUser(this.state.name);
    } else {
      this.setState({ error: 'Please enter a name under 50 characters using only letters and spaces' });
    }
  }

  validateUserInput = (name) => {
    let nameFixed = name.replace(/\s\s+/g, ' ').trim(); // replace multiple spaces with one space, trim ends
    if (nameFixed.length > 50) { // max 50 characters - unknown DB validation, but seems reasonable??
      return false;
    }
    return /^[a-zA-Z\s]*$/.test(nameFixed); // only allow letters and spaces
  }

  // Create the user in API, then send user info to Redux.
  createNewUser = (name) => {
    axios
      .get(`/user/create/${name}`)
      .then(resp => {
        let name = resp.data.json.legal_names[0];
        let userId = resp.data.json._id;
        // this.sendToRedux(name, userId, this.reroutePage);
        // this.createNewNode();
      })
      .catch(err => {
        this.setState({ error: 'Unable to create account. Please reload the page and try again.' });
      });
  }

  // Create the node in API to user for transactions in the app.
  createNewNode = () => {
    axios
      .get('/nodes/create')
      .then(resp => resp)
      .catch(err => {
        this.setState({ error: 'Unable to create account node. Please reload the page and try again.' });
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
        <h3>Create New User</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Name:</Label>
            <Input
              style={{ width: '20rem', margin: 'auto' }}
              type="text"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
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

export default connect(mapStateToProps)(CreateNewUser);
