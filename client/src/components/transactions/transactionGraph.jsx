import React, { Component } from 'react';
import Graph from '../graph/graph';
import axios from 'axios';
import moment from 'moment';
// import testTransactions from './testTransactions'; // comment in for testing

// When testing, comment in testTransactions in import and state, then comment out componentDidMount() func.
// Also adjust main component requirements in render for TransactionGraph component.

class TransactionGraph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
      activeNodeId: this.props.activeNodeId,
      error: null,
      chartData: [],
      // chartData: testTransactions, // comment in for testing
      newTransactionData: null,
    }
  }

  // When a new transaction is submitted from transactionForm, create an object w/ new amt to add to chartData for the graph.
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.newTransactionData !== prevState.newTransactionData) {
      let now = Date.now();
      let nowFormatted = moment(now).format("MMM Do YY");
      let newTransactionData = {
        amt: nextProps.newTransactionData,
        date: nowFormatted,
        fullDate: now,
      };
      // Push new data into the chartData and rerender graph component.
      return ({ chartData: [...prevState.chartData, newTransactionData] }) // same as setState
    }
    return null // must return something
  }

  // Load transaction data to pass into graph.
  componentDidMount = async () => {
    let transactionDataArray = await this.getTransactionData();
    let convertedTransactionData = this.convertTransactionData(transactionDataArray);
    this.setState({ chartData: convertedTransactionData });
  }

  getTransactionData = () => {
    return axios
      .get(`/transactions/get-all`)
      .then(resp => {
        if (resp.status === 200) {
          return resp.data.trans
        }
      })
      .catch(err => {
        console.log('err',err);
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
      </div>
    )
  }
}

export default TransactionGraph;
