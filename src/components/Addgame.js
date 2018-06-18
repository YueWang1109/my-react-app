import React, { Component } from 'react';
import "../CSS/default.css";
import "../CSS/login.css";
import Gameaddform from './GameAddForm';

class AddGame extends Component { 

    render(){
        return (
                <React.Fragment>
                    <Gameaddform/>
                </React.Fragment>
        );
}
  }

export default AddGame;