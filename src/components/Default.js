import React, { Component } from 'react';
import '../CSS/default.css';
import Nav from "./Nav";

class Default extends Component{
    render(){
        return(
          <React.Fragment>
              <Nav />
              <div className="my-pic">
                <div className="my-title">
                    <h1>Sports Game Shop</h1>
                </div>
              </div>
              
          </React.Fragment>
        );
    }
}

export default Default;