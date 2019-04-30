import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import Form from '../form/form';
import FormGroup from '../form/formGroup';
import Input from '../form/input';
import Label from '../form/label';
import Button from '../button/button';
import Error from '../error/error';


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: '',
      error: null,
    }
  }

  // // For testing - hardcode userId
  // componentDidMount = () => {
  //   this.setState({ userId: '' });
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.tryUserLogin(this.state);
  }

  // Get user from the API with userId.
  // If the user exists (userId), send user data to Redux and reroute page to Main. Else, show error.
  tryUserLogin = (state) => {
    let { userId } = state;
    axios
      .get(`/user/login/${userId}`)
      .then(resp => {
        if (resp.status !== 200) throw new Error('Unable to locate account. Please try another User ID.')
        let { legal_names, logins, phone_numbers, _id } = resp.data;
        this.sendToRedux(legal_names[0], logins[0].email, phone_numbers[0], _id);
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  sendToRedux = (legalName, email, phoneNumber, userId) => {
    let userData = { legalName, email, phoneNumber, userId, isLoggedIn: true };
    this.props.dispatch({
      type: "USER_LOGIN_REQUEST",
      payload: userData
    });
    this.props.displaySubmittedMessage();
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="userId">User ID:</Label>
            <Input
              type="text"
              id="userId"
              name="userId"
              value={this.state.userId}
              onChange={e => this.handleChange(e)}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
        <Error>{this.state.error && this.state.error}</Error>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    legalName: state.legalName,
    email: state.email,
    phoneNumber: state.phoneNumber,
    userId: state.userId,
    isLoggedIn: state.isLoggedIn
  };
}

export default connect(mapStateToProps)(Login);
