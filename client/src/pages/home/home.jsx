import React from 'react';
import Login from '../../components/login/login';
import CreateNewUser from '../../components/createNewUser/createNewUser';
import Card from '../../components/card/card';
import Container from '../../components/container/container';

const Home = () => {
  return (
    <Container>
      <Card width='40rem' margin='1rem auto'>
        <CreateNewUser />
      </Card>
      <Card width='40rem' margin='1rem auto'>
        <Login />
      </Card>
    </Container>
  )
}

export default Home;
