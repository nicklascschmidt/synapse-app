import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from './pages/home/home';
import Main from './pages/main/main';
import NavbarComponent from './components/nav/nav';
import { Container } from 'reactstrap';

import TestGraph from './components/graph/testGraph';

class App extends Component {
  state = {

  };

  render() {
    return (
      <div className='wrapper'>
        <Router>
          <NavbarComponent />
          <Container style={{padding:'2rem 0'}}>
            <Route path="/" exact component={Home} />
            <Route path="/main" component={Main} />
            <Route path="/test" component={TestGraph} />
          </Container>
        </Router>
      </div>
    );
  }
}
export default App;