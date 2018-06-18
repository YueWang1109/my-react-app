import React, { Component } from 'react';

class Copyright extends Component{
    render(){
        return(
            <div>
                <div className="col-sm-6 col-md-12">
                <div className="panel panel-info">
                  <div className="panel-heading">
                    <h3 className="panel-title"><span className="btn">This is Copyright Page</span></h3>
                  </div>
                  <div className="panel-body">
                    <p>© 2018 Yue Wang. All Rights Reserved</p>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Copyright;