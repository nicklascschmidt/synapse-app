import React, { Component } from 'react';
import axios from 'axios';
import Form from '../form/form';
import FormGroup from '../form/formGroup';
import Input from '../form/input';
import Label from '../form/label';
import Button from '../button/button';
import Error from '../error/error';
import SubmittedMsg from '../submittedMsg/submittedMsg';
import { validateUserInputs } from './userValidation';
import Dropdown from '../form/dropdown';
import transactionCategoryArray from './transactionCategoryArray';
import exampleNodeArray from './exampleNodeArray';

class TransactionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: this.props.userId,
      transactionAmt: '',
      toNodeId: '',
      transactionDescription: '',
      categoryName: '',
      error: null,
      showMessage: null,
      confirmationMessage: null,
    }
  }

  // Validate transaction input. If valid, submit transaction. Else, show error.
  // If transaction submits correctly, reset the form and refresh the graph component (bc new data).
  handleSubmit = async (e) => {
    e.preventDefault();

    let { transactionAmt, toNodeId, transactionDescription, categoryName } = this.state;
    let transactionObject = { transactionAmt, toNodeId, transactionDescription, categoryName };

    let errorObj = validateUserInputs(transactionObject);
    if (errorObj.isValid) {
      this.clearErrors();
      let transactionSubmittedBool = await this.tryTransactionSubmit(transactionObject);
      if (transactionSubmittedBool) {
        this.displaySubmittedMessage();
        this.resetForm();
        this.props.refreshTransactionGraph();
      }
    } else {
      this.setState({ validationErrors: errorObj.errors });
    }
  }

  // Submit the transaction and show confirmation message if success, error if fail.
  tryTransactionSubmit = (transactionObject) => {
    return axios
      .post(`/transactions/create`, transactionObject)
      .then(resp => {
        if (resp.status !== 200) throw new Error('We ran into an error submitting your transaction. Please reload the page or try logging in again.');
        if (!resp.data) throw new Error('We ran into an error submitting your transaction. Please reload the page or try logging in again.');
        return true
      })
      .catch(err => {
        this.setState({ error: err.props });
      });
  }

  displaySubmittedMessage = () => {
    this.setState({
      showMessage: true,
      confirmationMessage: 'Transaction submitted!'
    });
    setTimeout(this.hideMessage, 3 * 1000);
  }

  hideMessage = () => {
    this.setState({ showMessage: false });
  }

  clearErrors = () => {
    if (this.state.validationErrors !== null) {
      this.setState({ validationErrors: null });
    }
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Save storedValue to state if toNodeName is updated.
  handleDropdownChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
    let storedValue = event.target.getAttribute('data-storedvalue');
    if (name === 'toNodeName') {
      this.setState({ toNodeId: storedValue })
    }
  }

  resetForm = () => {
    this.setState({
      transactionAmt: '',
      toNodeId: '',
      transactionDescription: '',
      categoryName: '',
    });
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <Label htmlFor="transactionAmt">Amount (USD):</Label>
          <Input
            type="text"
            id="transactionAmt"
            name="transactionAmt"
            value={this.state.transactionAmt}
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="transactionDescription">Description:</Label>
          <Input
            type="text"
            id="transactionDescription"
            name="transactionDescription"
            value={this.state.transactionDescription}
            onChange={e => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Dropdown activeValue='select' name='categoryName' array={transactionCategoryArray} handleClickFromParent={this.handleDropdownChange}>
            <Label>Category:</Label>
          </Dropdown>
        </FormGroup>
        <FormGroup>
          <Dropdown activeValue='select' name='toNodeName' array={exampleNodeArray} handleClickFromParent={this.handleDropdownChange}>
            <Label>Send to:</Label>
          </Dropdown>
        </FormGroup>
        <Button
          type="submit"
          style={{ display: 'inline-block', margin: '.5rem auto' }}
          color='primary'
          onClick={this.handleSubmit}>Submit</Button>
        <SubmittedMsg>{this.state.showMessage && this.state.confirmationMessage}</SubmittedMsg>
        {(this.state.validationErrors) && this.state.validationErrors.map( (err,i) => <Error key={i}>{err}</Error> )}
        <Error>{this.state.error && this.state.error}</Error>
      </Form>
    )
  }
}

export default TransactionForm;
