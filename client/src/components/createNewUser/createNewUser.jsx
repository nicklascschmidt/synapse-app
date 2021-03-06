import React, { Component } from 'react';
import { connect } from "react-redux";
import Form from '../form/form';
import FormGroup from '../form/formGroup';
import Input from '../form/input';
import Label from '../form/label';
import Button from '../button/button';
import axios from 'axios';
import Error from '../error/error';
import { validateUserInputs } from './userValidation';

class CreateNewUser extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      legalName: '',
      email: '',
      phoneNumber: '',
      error: null,
      validationErrors: [],
      loading: false,
    }
  }

  // // For testing
  // componentDidMount = () => {
  //   this.setState({
  //     legalName: 'test user',
  //     email: 'test@test.com',
  //     phoneNumber: '1234567890',
  //   });
  // }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Validate input on submit. If valid, create a new user and new node for the user. Else, show error.
  handleSubmit = async (e) => {
    e.preventDefault();
    
    let { legalName, email, phoneNumber } = this.state;
    let userObj = { legalName, email, phoneNumber };
    
    let errorObj = validateUserInputs(userObj);
    if (errorObj.isValid) {
      this.setState({ loading: true, validationErrors: null });
      let userBool = await this.createNewUser(userObj);
      let nodeBool = await this.createNewNode();
      this.setState({ loading: false });

      if (userBool && nodeBool) {
        this.setState({ error: null });
      } else {
        this.setState({ error: 'Submission error. Please try again.' });
      }
    } else {
      this.setState({ validationErrors: errorObj.errors });
    }
  }

  // Create the user in API, then send user info to Redux.
  createNewUser = (userObj) => {
    return axios
      .post(`/user/create`,userObj)
      .then(resp => {
        let { legal_names, logins, phone_numbers, _id } = resp.data.json;
        this.sendToRedux(legal_names[0], logins[0].email, phone_numbers[0], _id);
        return true
      })
      .catch(err => {
        this.setState({ error: 'Unable to create account. Please reload the page and try again.' });
      });
  }

  // Create the node in API to user for transactions in the app.
  createNewNode = () => {
    return axios
      .post('/nodes/create')
      .then(resp => true)
      .catch(err => {
        this.setState({ error: 'Unable to create account node. Please reload the page and try again.' });
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

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="legalName">Legal Name:</Label>
              <Input
                type="text"
                id="legalName"
                name="legalName"
                value={this.state.legalName}
                onChange={e => this.handleChange(e)}
              />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
              <Input
                type="text"
                id="email"
                name="email"
                value={this.state.email}
                onChange={e => this.handleChange(e)}
              />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phoneNumber">Phone Number:</Label>
              <Input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={e => this.handleChange(e)}
              />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
        {(this.state.validationErrors) && this.state.validationErrors.map( (err,i) => <Error key={i}>{err}</Error> )}
        <Error>{this.state.error && this.state.error}</Error>
        {this.state.loading && <p>Loading...</p>}
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

export default connect(mapStateToProps)(CreateNewUser);
