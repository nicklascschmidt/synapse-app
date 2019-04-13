import React, { Component } from 'react';
import Graph from '../graph/graph';
import axios from 'axios';
import moment from 'moment';

class TransactionGraph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
      activeNodeId: this.props.activeNodeId,
      error: null,
      chartData: null,
    }
  }

  // Load transaction data to pass into graph.
  componentWillMount = async () => {
    let transactionDataArray = await this.getTransactionData();
    let convertedTransactionData = this.convertTransactionData(transactionDataArray);
    this.setState({ chartData: convertedTransactionData });
  }

  getTransactionData = () => {
    return axios
      .get(`/transactions/get-all`)
      .then(resp => {
        if (resp.status === 200) {
          console.log('resp.data.trans',resp.data.trans);
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
      console.log('date: ',date);

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
        {this.state.chartData && <Graph chartData={this.state.chartData} />}
      </div>
    )
  }
}

export default TransactionGraph;
