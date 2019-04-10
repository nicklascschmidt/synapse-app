import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import Error from '../../components/error/error';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      userId: this.props.userId,
      transactionAmt: 0,
      error: null,
    }
  }

  componentDidMount = () => {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    // only allow this to submit if userId is not null in the redux store
    // if it's null, then that means there's no user logged in and we can't pull nodes if there's no userId
    // also need 'user' var in server or else it won't work
    if (this.state.isLoggedIn) {
      this.tryTransactionSubmit(this.state);
    } else {
      this.setState({ error: 'Please login to use the app.' });
    }
  }

  tryTransactionSubmit = (state) => {
    let { userId, transactionAmt } = state;
    console.log('userId', userId);
    console.log('transactionAmt', transactionAmt);
    axios
      .get('/nodes/get-all')
      .then(resp => {
        console.log('resp', resp);
      })
      .catch(err => {
        this.setState({ error: 'catch block hit' });
      });
  }

  // Activates 'user' var in server.js. userId comes from Redux store
  loginUser = (userId) => {
    axios
      .get(`/login/${userId}`)
      .then(resp => {
        console.log('resp', resp);
        console.log('welcome~', resp.data.legal_names[0]);
        // save userId and name into Redux -- more stuff too?
      })
      .catch(err => {
        this.setState({ error: 'Unable to locate account. Please login again.' });
      });
  }

  render() {
    return (
      <div>
        <p>hey {this.state.userId}</p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Transaction amount:</Label>
            <Input
              style={{ width: '10rem', margin: 'auto' }}
              type="text"
              value={this.state.transactionAmt}
              onChange={e => this.setState({ transactionAmt: e.target.value })}
            />
          </FormGroup>
          <Button type="submit" style={{ display: 'block', margin: 'auto' }}>Go</Button>
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

export default connect(mapStateToProps)(Main);
