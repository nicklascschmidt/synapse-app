import React from 'react';
// import Login from '../../components/login/login';
import CreateNewUser from '../../components/createNewUser/createNewUser';
import CardComponent from '../../components/card/card';

const Home = () => {
  return (
    <CardComponent>
      <CreateNewUser />
    </CardComponent>
  )
}

export default Home;
