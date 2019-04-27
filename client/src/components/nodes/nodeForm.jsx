import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';
import Form from '../form/form';
import FormGroup from '../form/formGroup';

class NodeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userNodes: this.props.userNodes,
    }
  }

  // Display nodes. The first node is checked by default.
  render() {
    let nodes = this.state.userNodes.map((item, index) => {
      return (
        <FormGroup key={index}>
          <Label check>
            <Input type="radio" name='radioButton' value={item._id} onChange={e => this.props.changeRadio(e.target.value)} checked={(index === 0) ? true : false} />{' '}
            <span>{item.info.bank_name}</span>
            {item.info.nickname && <span> | {item.info.nickname}</span>}
          </Label>
        </FormGroup>
      )
    });
    return (
      <Form>
        {nodes}
      </Form>
    )
  }
}

export default NodeForm;
