import React, { Component } from 'react';
import axios from 'axios';
import Error from '../error/error';
import NodeForm from './nodeForm';

class Nodes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userNodesAreLoaded: null,
      userNodes: [],
      startingNodeId: null,
      nodeArrayIsEmpty: null,
    }
  }

  // Load nodes var in server. When finished, load the nodeForm component and pass in the startingNodeId
  componentDidMount = async () => {
    let nodeArray = await this.getNodes();
    if (nodeArray) {
      this.setState({
        userNodes: nodeArray,
        startingNodeId: nodeArray[0]._id,
        userNodesAreLoaded: true,
      });
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

  render() {
    return (
      <div>
        {this.state.nodeArrayIsEmpty && 'No nodes to show.'}
        {this.state.userNodesAreLoaded && <NodeForm userNodes={this.state.userNodes} startingNodeId={this.state.startingNodeId} />}
        <Error>{this.state.error}</Error>
      </div>
    )
  }
}

export default Nodes;
