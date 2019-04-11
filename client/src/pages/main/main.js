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
      userLoaded: false,
    }
  }

  componentDidMount = async () => {
    // First GET the user object in server.js. Transactions won't work without the user object loaded.
    // When complete, show the submit button (allow user to submit transactions)
    let loginUserComplete = await this.loginUser(this.state.userId);
    if (loginUserComplete) {
      this.setState({ userLoaded: true});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Button will not show until userLoaded is true
    this.tryTransactionSubmit(this.state);
  }

  tryTransactionSubmit = (state) => {
    // let { userId, transactionAmt } = state;
    // console.log('transactionAmt', transactionAmt);
    axios
      .get('/nodes/get-all')
      .then(resp => {
        console.log('resp', resp);
      })
      .catch(err => {
        this.setState({ error: 'catch block hit' });
      });
  }

  // Loads 'user' var in server.js. userId comes from Redux store.
  loginUser = (userId) => {
    return axios
      .get(`/login/${userId}`)
      .then(resp => {
        if (resp.status === 200) {
          return true
        } else {
          this.setState({ error: 'Connection error. Please try again.' });
        }
      })
      .catch(err => {
        this.setState({ error: 'We ran into an error loading your account. Please reload the page or log in again.' });
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
          {this.state.userLoaded
            ? <Button type="submit" style={{ display: 'block', margin: 'auto' }}>Go</Button>
            : <p>loading...</p>}
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
