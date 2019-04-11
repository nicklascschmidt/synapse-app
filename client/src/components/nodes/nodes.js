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
        console.log('resp',resp);
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

  changeRadio = (e) => {
    // Fire parent func to switch activeNode. Then get activeNode for server.
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






// For testing

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