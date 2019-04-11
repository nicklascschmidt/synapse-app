import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export class Nodes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userNodes: [],
      // userNodes: [
      //   {
      //     _id: 'idBoa123',
      //     info: {
      //       bank_name: 'BOA',
      //       nickname: 'my boa checking acct'
      //     }
      //   },
      //   {
      //     _id: 'idChase987',
      //     info: {
      //       bank_name: 'Chase',
      //       nickname: 'my chase savings acct'
      //     }
      //   }
      // ],
    }
  }

  componentDidMount = () => {
    this.setState({ userNodes: this.props.userNodes});
  }

  changeRadio = (e) => {
    // Fire parent func to switch activeNode. Then get activeNode for server.
    this.props.switchActiveNode(e.target.value);
    this.getActiveNode(e.target.value);
  }

  getActiveNode = (nodeId) => {
    axios
      .get(`/nodes/get-one/${nodeId}`)
      .then(resp => resp)
      .catch(err => console.log('err',err));
  }

  render() {
    let nodes = this.state.userNodes.map((item, index) => {
      return (
        <FormGroup key={index}>
          <Label check>
            <Input type="radio" name='radioButton' value={item._id} onChange={this.changeRadio} />{' '}
            <span>{item.info.bank_name}</span>
            {item.info.nickname && <span> | {item.info.nickname}</span>}
          </Label>
        </FormGroup>
      )
    });
    return (
      <div>
        <h4>Accounts</h4>
        <FormGroup tag="fieldset">
          {nodes}
        </FormGroup>
      </div>
    )
  }
}

export default Nodes;
