import React, { Component } from 'react';
import '../CSS/default.css';
import Nav from "./Nav";
import {Link} from 'react-router-dom'

class Default extends Component{
    render(){
      let user = localStorage.getItem('authed');
        return(
          <React.Fragment>
              <Nav />
              <div className="my-pic">
                <div className="my-title">
                    <h1>Sports Game Shop</h1>
                    <h2>
                    A world light years beyond your imagination.
                    </h2>
                    {
                        user?
                        null
                    :
                        <Link className="loginbtn" to="/login">Sign in</Link>
                    }
                </div>
              </div>
              
          </React.Fragment>
        );
    }
}

export default Default;