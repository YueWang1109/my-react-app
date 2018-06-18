import React, { Component } from 'react';
import '../App.css';
import '../CSS/default.css';
import {Nav,Navbar,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';

class Mynav extends Component {
  constructor(props){
    super(props);
    this.state = {
      authed: 'false'
    }
  }
  handleLogout(){
    //debugger;
    localStorage.clear();
  }
  componentWillReceiveProps(){
    debugger;
    if(this.props.authed === 'false'){
      this.handleLogout();
      this.setState({authed: false})
    }
  }
  componentDidMount(){
    //debugger;
    this.setState({authed:localStorage.getItem('authed')});
  }
  render() {
    debugger;
    return (
      <Navbar className="my-nav" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">My sample app</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/about">
              About
            </NavItem>
            {
              this.state.authed?
              <React.Fragment>
              <NavItem eventKey={2} href="/inventory">
                Games
              </NavItem>
              { this.state.authed === "2" ?
                <NavDropdown eventKey={3} title="manage" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} href="/inventory">View Products</MenuItem>
                  <MenuItem eventKey={3.2} href="/users">View Users</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
                :
                null
              }
              </React.Fragment>
             
              :
              null
            }
          </Nav>
          <Nav pullRight>
          {this.state.authed?
            <React.Fragment>
            <NavItem eventKey={1} href="/profile">
            {localStorage.getItem('useremail')}
            </NavItem>
            <NavItem eventKey={2} href="/" onClick={this.handleLogout}>
              Log out
            </NavItem>
            </React.Fragment>
            :
            <React.Fragment>
            <NavItem eventKey={1} href="/login">
              Login
            </NavItem>
            <NavItem eventKey={2} href="/register">
              Register
            </NavItem>
            </React.Fragment>
          
          }
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Mynav;