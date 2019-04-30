import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Label, Input } from 'reactstrap';
import Form from '../form/form';
import FormGroup from '../form/formGroup';
import Error from '../error/error';

class NodeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userNodes: this.props.userNodes,
      activeNodeId: this.props.startingNodeId,
      error: null,
    }
  }

  // Load node var in server. Then update redux with the activeNodeId.
  componentDidMount = () => {
    this.updateActiveNode(this.state.activeNodeId);
  }

  updateActiveNode = async (activeNodeId) => {
    let activeNodeBool = await this.getActiveNode(activeNodeId);
    if (activeNodeBool) {
      this.sendActiveNodeIdToRedux(activeNodeId);
    }
  }

  getActiveNode = (nodeId) => {
    return axios
      .get(`/nodes/get-one/${nodeId}`)
      .then(resp => {
        if (resp.status !== 200) throw new Error('Error loading node. Please reload the page.');
        if (!resp.data) throw new Error('Error loading node. Please reload the page.');
        return true
      })
      .catch(err => {
        this.setState({ error: err.props });
      });
  }

  sendActiveNodeIdToRedux = (activeNodeId) => {
    this.props.dispatch({
      type: "UPDATE_activeNodeId",
      payload: { activeNodeId }
    });
  }

  handleRadioChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
    this.updateActiveNode(value);
  }

  // Display nodes. The first node is checked by default.
  render() {
    let nodes = this.state.userNodes.map((item, index) => {
      return (
        <FormGroup key={`nodeForm${index}`}>
          <Label check>
            <Input type="radio"
              name='activeNodeId'
              value={item._id}
              onChange={this.handleRadioChange}
              checked={this.state.activeNodeId === item._id}
            />{' '}
            <span>{item.info.bank_name}</span>
            {item.info.nickname && <span> | {item.info.nickname}</span>}
          </Label>
        </FormGroup>
      )
    });
    return (
      <Form>
        {this.state.error ? <Error>{this.state.error}</Error> : nodes}
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeNodeId: state.activeNodeId,
  };
}

export default connect(mapStateToProps)(NodeForm);
