import React, { Component } from 'react';
import Mynav from "./Nav";
import "../CSS/default.css";
import "../CSS/login.css";
import Gameaddform from './GameAddForm';

class AddGame extends Component { 

    render(){
        return (
                <React.Fragment>
                    <Mynav/>
                    <Gameaddform/>
                </React.Fragment>
        );
}
  }

export default AddGame;