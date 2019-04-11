import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      name: this.props.name,
    }
  }

  handleLogOut = (e) => {
    this.props.dispatch({
      type: "USER_LOGOUT_REQUEST",
    });
    window.location = '/';
  }

  render() {
    let logInOrOut = this.state.isLoggedIn
      ? <span onClick={this.handleLogOut} className='nav-link'>Log Out</span>
      : <Link to="/">Log In</Link>;
    return (
      <nav>
        <ul>
          <li>{this.state.name}</li>
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
