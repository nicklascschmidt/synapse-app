import React, { Component } from 'react';
import axios from 'axios';
import Error from '../error/error';
import NodeForm from './nodeForm';
// import testNodes from './testNodes'; // comment in when testing

class Nodes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userNodesAreLoaded: null,
      userNodes: [],
      // userNodes: testNodes, // comment in when testing
      nodeArrayIsEmpty: null,
    }
  }

  componentWillMount = () => {
    this.getNodes();
  }

  // Get nodes and save into this.state. If the nodeArray is empty, then display msg (nodeArrayIsEmpty=true).
  getNodes = () => {
    axios
      .get('/nodes/get-all')
      .then(resp => {
        if (resp.status !== 200) {
          this.setState({ error: 'Connection error. Please try again.' });
          return
        }

        let nodeArray = resp.data;
        let nodeArrayLength = resp.data.length;

        if (nodeArrayLength > 0) {
          this.setState({
            userNodes: nodeArray,
            userNodesAreLoaded: true
          });
        } else {
          this.setState({ nodeArrayIsEmpty: true });
        }
      })
      .catch(err => {
        this.setState({ error: 'Error loading nodes. Please reload the page.' });
      });
  }

  // On radio button click, fire parent func to switch activeNode. Then get activeNode for server.
  changeRadio = (e) => {
    let nodeId = e.target.value;
    this.props.switchActiveNode(nodeId);
    this.getActiveNode(nodeId);
  }

  getActiveNode = (nodeId) => {
    axios
      .get(`/nodes/get-one/${nodeId}`)
      .then(resp => resp)
      .catch(err => {
        this.setState({ error: 'Error loading node. Please reload the page.' });
      });
  }

  render() {
    return (
      <div>
        <h4>Accounts</h4>
        {this.state.nodeArrayIsEmpty && 'No nodes to show.'}
        {this.state.userNodesAreLoaded && <NodeForm userNodes={this.state.userNodes} changeRadio={this.changeRadio} />}
        <Error>{this.state.error}</Error>
      </div >
    )
  }
}

export default Nodes;
