import React from 'react';
import Login from '../../components/login/login';
import CreateNewUser from '../../components/createNewUser/createNewUser';
import { Row, Col } from 'reactstrap';
import CardComponent from '../../components/card/card';

const Home = () => {
  return (
    <Row>
      <Col>
        <CardComponent>
          <Login />
        </CardComponent>
      </Col>
      <Col>
        <CardComponent>
          <CreateNewUser />
        </CardComponent>
      </Col>
    </Row>
  )
}

export default Home;
