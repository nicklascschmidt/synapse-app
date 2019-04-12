import React, { Component } from 'react';
import Login from '../../components/login/login';
import CreateNewUser from '../../components/createNewUser/createNewUser';
import { Row, Col } from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Login />
          </Col>
          <Col>
            <CreateNewUser />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
