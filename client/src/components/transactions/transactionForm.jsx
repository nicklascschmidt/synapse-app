import React, { Component } from 'react';
import axios from 'axios';
// import { Form, FormGroup, Button, Input } from 'reactstrap';
import Form from '../form/form';
import FormGroup from '../form/formGroup';
import Input from '../form/input';
import Label from '../form/label';
import Button from '../button/button';
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

  // Validate transaction input. If valid, submit transaction and clear form. Else, show error.
  handleSubmit = (e) => {
    e.preventDefault();

    console.log('handleSubmit!!!',this.state.transactionAmt);

    // let isValid = this.validateTransactionInput(this.state.transactionAmt);
    // if (isValid) {
    //   this.clearError();
    //   this.tryTransactionSubmit();
    //   this.setState({ transactionAmt: 0 });
    // } else {
    //   this.setState({ error: 'Please enter a positive dollar amount (max $100).' });
    // }
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
  tryTransactionSubmit = () => {
    let { userId, transactionAmt, activeNodeId } = this.state;
    let params = { userId, transactionAmt, activeNodeId };
    axios
      .post(`/transactions/create`, null, { params })
      .then(resp => {
        if (resp.status !== 200) {
          this.setState({ error: 'Connection error. Please try again.' });
          return
        }
        // Update graph through Main component func addTransactionToGraph. Show confirmation message for 3 seconds.
        this.props.addTransactionToGraph(transactionAmt);
        this.setState({
          showMessage: true,
          confirmationMessage: 'Transaction submitted!'
        });
        setTimeout(this.hideMessage, 3 * 1000);
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

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Form inline>
        <FormGroup style={{}}>
          <Label htmlFor="transactionAmt">Amount (USD):</Label>
          <Input
            type="text"
            id="transactionAmt"
            name="transactionAmt"
            value={this.state.transactionAmt}
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <Button
          type="submit"
          style={{ display: 'inline-block', margin: '.5rem auto' }}
          color='primary'
          onClick={this.handleSubmit}>Submit</Button>
        <SubmittedMsg>{this.state.showMessage && this.state.confirmationMessage}</SubmittedMsg>
        <Error>{this.state.error}</Error>
      </Form>
    )
  }
}

export default TransactionForm;
