import React, { Component } from 'react';
import Mynav from './Nav';
import '../CSS/default.css';

class About extends Component{
    render(){
        return(
          <React.Fragment>
            <Mynav/>
              <div className="my-title">
                <h3>This is About Page</h3>
              </div>
              <div className="my-about">
              </div>
          </React.Fragment>
        );
    }
}

export default About;