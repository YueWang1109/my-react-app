import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import About from './components/About';
import Default from './components/Default';
import Copyright from './components/Copyright';
import Profile from './components/Profile';
import Inventory from './components/Inventory';
import Update from './components/update';
import AddGame from './components/Addgame';
import AuthFaild from './components/Authorization_failed'
import PrivateRoute  from './utils/PrivateRoute';

class Root extends Component {
    
    render() {
      debugger;
      let user = localStorage.getItem('authed');
      return (
        <div className="container">
            <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Default}/>
                <Route exact path="/authfailed" component={AuthFaild}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/copyright" component={Copyright}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <PrivateRoute exact path="/inventory" currentUser={user} level="1" component={Inventory}/>
                <PrivateRoute exact path="/update/:id" currentUser={user} level="2" component={Update}/>
                <PrivateRoute exact path="/addgame" currentUser={user} level="2" component={AddGame}/>
                <Route component={Default}/>
            </Switch>

            </BrowserRouter>
        </div>
      )
    }
  }

export default Root;