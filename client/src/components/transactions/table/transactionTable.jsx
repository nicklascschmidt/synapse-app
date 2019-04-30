import React, { Component } from 'react';
import moment from 'moment';
import Table from '../../table/table';

class TransactionHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
      chartData: [],
    }
  }

  showTableContents = (chartData) => {
    let rows = chartData.map( (transaction, i) => {
      let dateCreated = moment(transaction.timeline[0].date).format("MMM D YY, h:mm a");
      let fromNode = transaction.from.nickname;
      let toName = transaction.to.user.legal_names[0];
      let amount = transaction.amount.amount;
      let currency = transaction.amount.currency;
      let description = transaction.extra.note || 'n/a';
      let groupId = transaction.extra.group_id || 'n/a';
      return (
        <tr key={`transactionTable${i}`}>
          <td>{dateCreated}</td>
          <td>{fromNode}</td>
          <td>{toName}</td>
          <td>{`${amount} ${currency}`}</td>
          <td>{description}</td>
          <td>{groupId}</td>
        </tr>
      )
    })
    return <tbody>{rows}</tbody>
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Date Created</th>
            <th>From (Account)</th>
            <th>To (Name)</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        {this.showTableContents(this.props.chartData)}
      </Table>
    )
  }
}

export default TransactionHistory;
