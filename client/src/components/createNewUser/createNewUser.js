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

  handleSubmit = (e) => {
    e.preventDefault();
    this.createNewUser(this.state.name);
  }

  createNewUser = (name) => {
    axios
      .get(`/user/create/${name}`)
      .then(resp => {
        console.log('resp',resp.data.json);
        let name = resp.data.json.legal_names[0];
        let userId = resp.data.json._id;
        this.sendToRedux(name, userId, this.reroutePage);
      })
      .catch(err => {
        this.setState({ error: 'Unable to create account. Please reload the page and try again.' });
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
