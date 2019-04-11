import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Row, Col, Form, FormGroup, Button, Input, Label } from 'reactstrap';
import Error from '../../components/error/error';
import SubmittedMsg from '../../components/submittedMsg/submittedMsg';
import Nodes from '../../components/nodes/nodes';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      userId: this.props.userId,
      transactionAmt: 0,
      error: null,
      userLoaded: false,
      activeNodeId: null,
      showMessage: null,
      confirmationMessage: null,
    }
  }

  // First GET the user object in server.js. Nodes & Transaction API calls won't work without the user object loaded.
  // When complete, get the nodes and show in display.
  // Then show the submit button (i.e. allow user to submit transactions).
  componentWillMount = async () => {
    let loginUserComplete = await this.loginUser(this.state.userId);
    if (loginUserComplete) {
      this.setState({ userLoaded: true });
    }
  }

  // Button will not show until userLoaded=true. activeNodeId is set on radio button click (on a Node/Account).
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.activeNodeId) {
      this.tryTransactionSubmit(this.state);
    } else {
      this.setState({ error: 'Please select an account first.' });
    }
  }

  // Submit the transaction and show confirmation message if success, error if fail.
  tryTransactionSubmit = (state) => {
    let { userId, transactionAmt, activeNodeId } = state;
    let params = { userId, transactionAmt, activeNodeId };
    axios
      .get(`/transactions/add`, { params })
      .then(resp => {
        if (resp.status !== 200) {
          this.setState({ error: 'Connection error. Please try again.' });
          return
        }
        // Show confirmation message for 3 seconds.
        this.setState({
          showMessage: true,
          confirmationMessage: 'Transaction submitted!'
        });
        setTimeout(this.hideMessage, 3*1000);
      })
      .catch(err => {
        this.setState({ error: 'We ran into an error submitting your transaction. Please reload the page or try logging in again.' });
      });
  }

  hideMessage = () => {
    this.setState({ showMessage: false });
  }

  // Loads 'user' var in server.js. userId comes from Redux store.
  loginUser = (userId) => {
    return axios
      .get(`/user/login/${userId}`)
      .then(resp => {
        if (resp.status !== 200) {
          this.setState({ error: 'Connection error. Please try again.' });
          return
        }
        return true
      })
      .catch(err => {
        this.setState({ error: 'We ran into an error loading your account. Please reload the page or log in again.' });
      });
  }

  // Passed to Nodes component via props. Fires on radio button switch. nodeId is passed up through the function.
  switchActiveNode = (nodeId) => {
    this.setState({
      activeNodeId: nodeId,
      error: null
    });
  }

  render() {
    let mainDisplay = !this.state.isLoggedIn
      ? <p>Please log in first</p>
      : (<div>
          <Row>
          <Col>
            {this.state.userLoaded && <Nodes switchActiveNode={this.switchActiveNode} />}
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Error>{this.state.error && this.state.error}</Error>
        <SubmittedMsg>{this.state.showMessage && this.state.confirmationMessage}</SubmittedMsg>
      </div>)

    return (
      <div>
        <h3>Main</h3>
        {mainDisplay}
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
