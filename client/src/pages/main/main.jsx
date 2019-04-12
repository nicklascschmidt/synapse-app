import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import Error from '../../components/error/error';
import Nodes from '../../components/nodes/nodes';
import TransactionForm from '../../components/transactions/transactionForm';
import Example from '../../components/graph/graph';

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      userId: this.props.userId,
      error: null,
      userLoaded: false,
      activeNodeId: null,
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
            {(this.state.userLoaded && this.state.activeNodeId)
              ? <TransactionForm userId={this.state.userId} activeNodeId={this.state.activeNodeId} />
              : <p>Please select an account to make transactions.</p>}
          </Col>
        </Row>
        <Error>{this.state.error}</Error>
        <Row>
          <Example />
        </Row>
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
    // name: state.name,
    userId: state.userId,
    isLoggedIn: state.isLoggedIn
  };
}

export default connect(mapStateToProps)(Main);
