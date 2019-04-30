import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Graph from '../graph/graph';
import Error from '../error/error';

class TransactionGraph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
      activeNodeId: this.props.activeNodeId,
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
    let convertedTransactionData = this.convertTransactionData(transactionDataArray);
    this.setState({ chartData: convertedTransactionData });
  }

  // Rerender graph component when a new transaction is submitted
  componentDidUpdate = (prevProps) => {
    if ( prevProps.refreshTransactionGraphBool !== this.props.refreshTransactionGraphBool ) {
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

  // Make an array to pass into the scatter chart. Sort data so dates line up on the X axis.
  convertTransactionData = (array) => {
    let newArray = array.map(obj => {
      let fullDate = obj.extra.created_on;
      let date = moment(obj.extra.created_on).format("MMM Do YY");

      let newObj = {
        fullDate,
        date,
        amt: obj.amount.amount,
      }
      return newObj
    });

    let sortedArray = newArray.sort(function(a, b) {
      let keyA = (a.fullDate);
      let keyB = (b.fullDate);
      return keyA - keyB;
    });
    return sortedArray
  }

  render() {
    return (
      <div>
        <h4>Transactions</h4>
        {(this.state.chartData.length > 0)
          ? <Graph chartData={this.state.chartData} />
          : <p>No transactions to show.</p>}
        <Error>{this.state.error && this.state.error}</Error>
      </div>
    )
  }
}

export default TransactionGraph;
