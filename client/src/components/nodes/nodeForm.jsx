import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class NodeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userNodes: null,
    }
  }

  componentWillMount = () => {
    this.setState({ userNodes: this.props.userNodes });
  }

  render() {
    let nodes = this.state.userNodes.map((item, index) => {
      return (
        <FormGroup key={index}>
          <Label check>
            <Input type="radio" name='radioButton' value={item._id} onChange={this.props.changeRadio} />{' '}
            <span>{item.info.bank_name}</span>
            {item.info.nickname && <span> | {item.info.nickname}</span>}
          </Label>
        </FormGroup>
      )
    });
    return (
      <FormGroup tag="fieldset">
        {nodes}
      </FormGroup>
    )
  }
}

export default NodeForm;
