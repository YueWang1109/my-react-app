import React, { Component } from 'react';
import Mynav from './Nav';
import { Link } from 'react-router-dom';

class AuthFaild extends Component{
    constructor(props){
        super(props)
        
        this.resetTheToken();
    }
    resetTheToken(){
        localStorage.clear();
    }
    render(){
        return (      
            <React.Fragment>
            <Mynav  authed="false"/>
            <h3 className="warning">Your Token has expired!</h3>
            <Link to='/login'>Click here to login again</Link>
            </React.Fragment>
        )
    }
}

export default AuthFaild;