import React, { Component } from 'react';
import Login from '../../components/login/login';
// import Signup from '../../components/signup/signup';
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
          {/* <Col>
            <Signup />
          </Col> */}
        </Row>
      </div>
    )
  }
}

export default Home;
