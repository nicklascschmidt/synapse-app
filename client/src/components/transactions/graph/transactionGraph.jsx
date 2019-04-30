import React, { Component } from 'react';
import axios from 'axios';
import transactionDataFormatter from './transactionDataFormatter';
import Graph from '../../graph/graph';
import Error from '../../error/error';

class TransactionGraph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
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
    let formattedDataArray = transactionDataFormatter(transactionDataArray);
    this.setState({
      chartData: formattedDataArray,
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
          ? <Graph chartData={this.state.chartData} />
          : <p>No transactions to show.</p>}
        <Error>{this.state.error && this.state.error}</Error>
      </div>
    )
  }
}

export default TransactionGraph;
