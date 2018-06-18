import React, { Component } from 'react';
import '../CSS/default.css';

class About extends Component{
    render(){
        return(
          <React.Fragment>
          <div className="my-pic">
            <div className="my-title">
                <h1>This is About Page</h1>
            </div>
          </div>
          </React.Fragment>
        );
    }
}

export default About;