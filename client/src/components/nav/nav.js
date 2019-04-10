import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: this.props.isLoggedIn
    }
  }

  handleLogOut = (e) => {
    console.log('logout plz!!');
  }

  render() {
    let logInOrOut = this.state.isLoggedIn
      ? <span onClick={this.handleLogOut} className='nav-link'>Log Out</span>
      : <Link to="/" className='nav-link'>Log In</Link>;
    return (
      <nav>
        <ul>
          <li>
            {logInOrOut}
          </li>
          <li>
            <Link to="/main">Main</Link>
          </li>
        </ul>
      </nav>
    )
  }
}


function mapStateToProps(state) {
  return {
    name: state.name,
    isLoggedIn: state.isLoggedIn
  };
}

export default connect(mapStateToProps)(Nav);
