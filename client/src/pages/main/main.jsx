import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import Error from '../../components/error/error';
import Nodes from '../../components/nodes/nodes';
import TransactionForm from '../../components/transactions/transactionForm';
import TransactionGraph from '../../components/transactions/transactionGraph';
import Card from '../../components/card/card';


class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      userId: this.props.userId,
      error: null,
      userLoaded: false,
      activeNodeId: null,
      newTransactionData: null,
      refreshTransactionGraphBool: false,
    }
  }

  // First GET the user object in server.js. Nodes & Transaction API calls won't work without the user object loaded.
  // When complete, get the nodes and show in display (nodeForm).
  // Then show the transaction submit button (i.e. allow user to submit transactions).
  componentDidMount = async () => {
    let loginUserComplete = (this.state.userId) ? await this.loginUser(this.state.userId) : false;
    if (loginUserComplete) {
      this.setState({ userLoaded: true });
    }
  }

  // Loads 'user' var in server.js. userId comes from Redux store.
  loginUser = (userId) => {
    return axios
      .get(`/user/login/${userId}`)
      .then(resp => {
        if (resp.status !== 200) throw new Error('We ran into an error loading your account. Please reload the page or log in again.');
        return true
      })
      .catch(err => {
        this.setState({ error: err.props });
      });
  }

  // Fired on TransactionForm submit. newData is transaction amt. setState updates graph component w/ updated props.newTransactionData
  addTransactionToGraph = (newData) => {
    this.setState({ newTransactionData: newData }, () => {
      this.setState({ newTransactionData: null });
    });
  }

  refreshTransactionGraph = () => {
    console.log('refreshTransactionGraph()!!!',this.refreshTransactionGraphBool);
    this.setState({
      refreshTransactionGraphBool: !this.state.refreshTransactionGraphBool
    });
  }

  // Updates state when props.activeNodeId is received from Redux
  static getDerivedStateFromProps(props, state) {
    if (props.activeNodeId !== state.activeNodeId) {
      return {
        activeNodeId: props.activeNodeId,
      };
    }
    return null;
  }

  render() {
    let mainDisplay = !this.state.isLoggedIn
      ? <p>Please log in first</p>
      : (<div>
        <Error>{this.state.error}</Error>
        <Row>
          <Col>
            <Card>
              <h4>Accounts</h4>
              {this.state.userLoaded ? <Nodes markNodesAsLoaded={this.markNodesAsLoaded} /> : <p>Loading...</p>}
            </Card>
          </Col>
          <Col>
            <Card>
              <h4>Create a Transaction</h4>
              {(this.state.userLoaded && this.state.activeNodeId)
                ? <TransactionForm userId={this.state.userId} refreshTransactionGraph={this.refreshTransactionGraph} />
                : <p>Please select an account to make transactions.</p>}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              {(this.state.userLoaded && this.state.activeNodeId)
                ? <TransactionGraph activeNodeId={this.state.activeNodeId} refreshTransactionGraphBool={this.state.refreshTransactionGraphBool} />
                : <p>Please select an account to view transaction history.</p>}
            </Card>
          </Col>
        </Row>
      </div>);

    return (
      <div>
        {this.props.legalName ? <h3>{this.props.legalName}'s Synapse Account</h3> : <h3>Synapse Account</h3>}
        {mainDisplay}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    legalName: state.legalName,
    userId: state.userId,
    isLoggedIn: state.isLoggedIn,
    activeNodeId: state.activeNodeId,
  };
}

export default connect(mapStateToProps)(Main);
