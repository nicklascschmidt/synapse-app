import React, { Component } from 'react';
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import Error from '../error/error';
import SubmittedMsg from '../submittedMsg/submittedMsg';

class TransactionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: this.props.userId,
      activeNodeId: this.props.activeNodeId,
      transactionAmt: 0,
      error: null,
      showMessage: null,
      confirmationMessage: null,
    }
  }

  // Validate transaction input. Submit transaction if valid. Else, show error.
  handleSubmit = (e) => {
    e.preventDefault();

    let isValid = this.validateTransactionInput(this.state.transactionAmt);
    if (isValid) {
      this.clearError();
      this.tryTransactionSubmit(this.state);
    } else {
      this.setState({ error: 'Please enter a positive dollar amount (max $100).' });
    }
  }

  // If input has non-numbers || is 0 || is over $100, return false and show error.
  validateTransactionInput = (amt) => {
    let amtFixed = (amt !== 0) && amt.trim(); // .trim() shows error on 0 input
    let isOnlyNumbers = /^\d+$/.test(amtFixed); // only allow numbers (and spaces on each end)
    let amtNum = parseFloat(amtFixed); // convert to #

    // max $100 - unknown, but should be capped (not at $100, but fine for testing)
    return (!isOnlyNumbers || amtNum <= 0 || amtNum > 100) ? false : true;
  }

  // Submit the transaction and show confirmation message if success, error if fail.
  tryTransactionSubmit = (state) => {
    let { userId, transactionAmt, activeNodeId } = state;
    let params = { userId, transactionAmt, activeNodeId };
    axios
      .post(`/transactions/create`, null, { params })
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

  clearError = () => {
    if (this.state.error !== null) {
      this.setState({ error: null });
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Submit a Transaction (USD):</Label>
          <Input
            style={{ width: '10rem', margin: 'auto' }}
            type="text"
            value={this.state.transactionAmt}
            onChange={e => this.setState({ transactionAmt: e.target.value })}
          />
        </FormGroup>
        <Button type="submit" style={{ display: 'block', margin: 'auto' }}>Submit</Button>
        <SubmittedMsg>{this.state.showMessage && this.state.confirmationMessage}</SubmittedMsg>
        <Error>{this.state.error}</Error>
      </Form>
    )
  }
}

export default TransactionForm;
