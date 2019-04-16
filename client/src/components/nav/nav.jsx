import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import './nav.css';


const navText = {
  color: '#61dafb',
  border: '1px solid white',
  padding: '5px',
}

class NavbarComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: null,
      name: null,
      isOpen: false,
    }
  }

  componentWillMount = () => {
    this.setState({
      isLoggedIn: this.props.isLoggedIn,
      name: this.props.name,
    });
  }

  handleLogOut = (e) => {
    this.props.dispatch({
      type: "USER_LOGOUT_REQUEST",
    });
    window.location = '/';
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let logInOrOut = this.state.isLoggedIn
      ? <span onClick={this.handleLogOut} className='nav-link-style'>Log Out</span>
      : <Link to="/">Log In</Link>;
    return (
      <Navbar color="dark" light expand="md">
        <span style={{ fontSize:'2rem' }}>Synapse App</span>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className='nav-link-style'>
              {logInOrOut}
            </NavItem>
            <NavItem className='nav-link-style'>
              <Link to="/main">Account</Link>
            </NavItem>
            <NavItem>
              {this.state.isLoggedIn && <span style={navText}>{this.state.name}</span>}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps(state) {
  return {
    name: state.name,
    isLoggedIn: state.isLoggedIn
  };
}

export default connect(mapStateToProps)(NavbarComponent);
