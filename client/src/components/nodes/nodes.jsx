import React, { Component } from 'react';
import axios from 'axios';
import Error from '../error/error';
import NodeForm from './nodeForm';
// import testNodes from './testNodes'; // comment in when testing

// When testing, comment in testNodes in import and state, then take out the userNodesAreLoaded=true requirement in render()

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

  componentDidMount = async () => {
    this.getNodes();
    let nodeArray = await this.getNodes();
    if (nodeArray) {
      this.setState({
        userNodes: nodeArray,
        userNodesAreLoaded: true
      });
      let startingNodeId = nodeArray[0]._id;
      this.changeRadio(startingNodeId);
    } else {
      this.setState({ nodeArrayIsEmpty: true });
    }
  }

  // Get nodes and save into this.state. If the nodeArray is empty, then display msg (nodeArrayIsEmpty=true).
  getNodes = () => {
    return axios
      .get('/nodes/get-all')
      .then(resp => {
        if (resp.status !== 200) throw new Error('Error loading nodes. Please reload the page.');

        let nodeArray = resp.data;
        if (nodeArray.length > 0) {
          return nodeArray
        }
        return false
      })
      .catch(err => {
        this.setState({ error: err.props });
      });
  }

  // On load OR on radio button click, fire parent func to switch activeNode. Then get activeNode for server.
  changeRadio = (nodeId) => {
    this.props.switchActiveNode(nodeId);
    this.getActiveNode(nodeId);
  }

  getActiveNode = (nodeId) => {
    axios
      .get(`/nodes/get-one/${nodeId}`)
      .then(resp => {
        this.props.markNodesAsLoaded();
      })
      .catch(err => {
        this.setState({ error: 'Error loading node. Please reload the page.' });
      });
  }

  render() {
    return (
      <div>
        {this.state.nodeArrayIsEmpty && 'No nodes to show.'}
        {this.state.userNodesAreLoaded && <NodeForm userNodes={this.state.userNodes} changeRadio={this.changeRadio} />}
        <Error>{this.state.error}</Error>
      </div >
    )
  }
}

export default Nodes;
