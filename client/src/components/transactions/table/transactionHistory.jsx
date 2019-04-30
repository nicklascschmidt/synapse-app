import React, { Component } from 'react';
import axios from 'axios';
import Error from '../../error/error';
import TransactionTable from './transactionTable';
import P from '../../textNote/p';

class TransactionHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      chartData: [],
    }
  }

  componentDidMount = () => {
    this.loadTransactionData();
  }

  // Load transaction data to pass into graph.
  loadTransactionData = async () => {
    let transactionDataArray = await this.getTransactionData();
    this.setState({
      chartData: transactionDataArray,
    });
  }

  // Listen for change in activeNodeId and refreshTransactionGraphBool.
  // Load the transaction data with the new activeNodeId when new transaction is submitted (i.e. props updated)
  componentDidUpdate = (prevProps) => {
    if ( (prevProps.activeNodeId !== this.props.activeNodeId) || (prevProps.refreshTransactionGraphBool !== this.props.refreshTransactionGraphBool) ) {
      this.loadTransactionData();
    }
  }

  getTransactionData = () => {
    return axios
      .get(`/transactions/get-all`)
      .then(resp => {
        if (resp.status !== 200) throw new Error('Error loading transactions.');
      
        return resp.data.trans
      })
      .catch(err => {
        this.setState({ error: err.props });
      })
  }

  render() {
    return (
      <div>
        {(this.state.chartData.length > 0)
          ? <div>
              <TransactionTable chartData={this.state.chartData} />
              <P>Transaction list is limited to the most recent 20 transactions.</P>
            </div>
          : <p>No transactions to show.</p>}
        <Error>{this.state.error && this.state.error}</Error>
      </div>
    )
  }
}

export default TransactionHistory;
