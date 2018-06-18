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

class Root extends Component {
    
    render() {
      debugger;
      let user = localStorage.getItem('authed');
      return (
        <div className="container my-container">
            <BrowserRouter>
            <div className="container-1">
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
                <PrivateRoute exact path="/game_update/:id" currentUser={user} level="2" component={Gameupdate}/>
                <PrivateRoute exact path="/user_update/:id" currentUser={user} level="2" component={Userupdate}/>
                <PrivateRoute exact path="/addgame" currentUser={user} level="2" component={AddGame}/>
                <PrivateRoute exact path="/users" currentUser={user} level="2" component={Users}/>
                <Route component={null}/>
            </Switch>
            </div>

            </BrowserRouter>
        </div>
      )
    }
  }

export default Root;