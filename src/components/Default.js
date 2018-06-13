import React, { Component } from 'react';
import Nav from './Nav';
import '../CSS/default.css';

class Default extends Component{
    render(){
        return(
          <React.Fragment>
            <Nav/>
              <div className="my-title">
                <h1>Sports Game Shop</h1>
              </div>
              <div className="my-pic"/>
              
          </React.Fragment>
        );
    }
}

export default Default;