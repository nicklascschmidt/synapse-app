import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from './pages/home/home';
import Main from './pages/main/main';
import Nav from './components/nav/nav';


class App extends Component {
  state = {

  };

  render() {
    return (
      <Router>
        <div className='wrapper'>
          <Nav />
          <Route path="/" exact component={Home} />
          <Route path="/main" component={Main} />
        </div>
      </Router>
    );
  }
}
export default App;