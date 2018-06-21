import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import About from './components/About';
import Default from './components/Default';
import Copyright from './components/Copyright';
import Profile from './components/Profile';
import Inventory from './components/Inventory';
import Gameupdate from './components/Gameupdate';
import Userupdate from './components/Userupdate';
import AddGame from './components/Addgame';
import AuthFaild from './components/Authorization_failed'
import PrivateRoute  from './utils/PrivateRoute';
import Users from './components/Users';
import Nav from "./components/Nav";
import Gamedetail from "./components/GameDetail";

class Root extends Component {
    
    render() {
      debugger;
      let user = localStorage.getItem('authed');
      return (
        <div className="container my-container container-1">
            <BrowserRouter>
            <React.Fragment>
            <Switch>
                <Route exact path="/" component={Default}/>
                <Nav />
            </Switch>
            <Switch>
                <Route exact path="/authfailed" component={AuthFaild}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/copyright" component={Copyright}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <PrivateRoute exact path="/inventory" currentUser={user} level="1" component={Inventory}/>
                <PrivateRoute exact path="/game_detail/:id" currentUser={user} level="1" component={Gamedetail}/>
                <PrivateRoute exact path="/game_update/:id" currentUser={user} level="2" component={Gameupdate}/>
                <PrivateRoute exact path="/addgame" currentUser={user} level="2" component={AddGame}/>
                <PrivateRoute exact path="/user_update/:id" currentUser={user} level="3" component={Userupdate}/>
                <PrivateRoute exact path="/users" currentUser={user} level="3" component={Users}/>
                <Route component={null}/>
            </Switch>
            </React.Fragment>
            </BrowserRouter>
            <footer>
              <div className="contact-info">
                <div>NeuLion USA.</div>
                <div>1600 Old Country Road, Plainview, New York</div>
              </div>
              <div className="social-media">
                <i class="fab fa-google-plus-g"></i>
                <i class="fab fa-facebook"></i>
                <i class="fab fa-twitter"></i>
              </div>
            </footer>
        </div>
      )
    }
  }

export default Root;