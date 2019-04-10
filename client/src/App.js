import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './pages/home/home';


class App extends Component {
  state = {

  };

  render() {
    return (
      <Router>
        <div className='wrapper'>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* <li>
                <Link to="/app/">About</Link>
              </li> */}
            </ul>
          </nav>

          <Route path="/" exact component={Home} />
          {/* <Route path="/app/" component={Login} /> */}
        </div>
      </Router>
    );
  }
}
export default App;