import React, { Component } from 'react';
import "../CSS/default.css";
import "../CSS/login.css";
import { addGame } from '../utils/My_api';
import { Redirect } from 'react-router'

class Gameaddform extends Component { 

    constructor(props) {
        super(props);
        
        this.state = {
            gamename: '',
            quantity: '',
            category: '',
            description: '',
            price: '',
            selectedFile: '',
            authed: true,
            redirect: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }
    resetState(){
        this.setState({
            gamename: '',
            quantity: '',
            category: '',
            description: '',
            price: '',
            selectedFile: '',
            redirect: false
        })
    }
    handleCancel() {
        this.setState({
            redirect: true
        });
    }
    handleChange(e) {
        e.target.classList.add('active');
        
        this.setState({
            [e.target.name]: e.target.value
        });
        
        this.showInputError(e.target.name);
    }
    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    }

    handleSubmit(e) {    
        e.preventDefault();
        debugger;
        console.log('component state', JSON.stringify(this.state));
        
        if (!this.showFormErrors()) {
            console.log('form is invalid: do not submit');
        } else {            
            debugger;
            addGame(this.state).then((data) => {
            //this.setState({isAuthenticated: true});
            if(data.affectedRows === 1){
                debugger;
                this.setState({
                    authed: true,
                    redirect: true
                });
                window.confirm("Added success.");
            }
            else{
                this.resetState();
            }
            console.log(`login state: ${this.state}`);
                
        }).catch((error) => {
            debugger;
            this.setState({
                authed: false
            });
            if(error)
                throw error;
        });
        }
    }
    
    showFormErrors() {
        const inputs = document.querySelectorAll('input');
        let isFormValid = true;
        
        inputs.forEach(input => {
            input.classList.add('active');
            
            const isInputValid = this.showInputError(input.name);
            
            if (!isInputValid) {
            isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    showInputError(refName) {
        const validity = this.refs[refName].validity;
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);
        const isPassword = refName.indexOf('password') !== -1;
        const isPasswordConfirm = refName === 'passwordConfirm';
        
        if (isPasswordConfirm) {
            if (this.refs.password.value !== this.refs.passwordConfirm.value) {
            this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
            } else {
            this.refs.passwordConfirm.setCustomValidity('');
            }
        }
            
        if (!validity.valid) {
            if (validity.valueMissing) {
            error.textContent = `${label} is a required field`; 
            } else if (validity.typeMismatch) {
            error.textContent = `${label} should be a valid email address`; 
            } else if (isPassword && validity.patternMismatch) {
            error.textContent = `${label} should be longer than 4 chars`; 
            } else if (isPasswordConfirm && validity.customError) {
            error.textContent = 'Passwords do not match';
            }
            return false;
        }
        
        error.textContent = '';
        return true;
    }

    render() {
    if(this.state.redirect === true){
        return <Redirect to="/inventory"/>
    }
    if(!this.state.authed)
        return <Redirect to="/authfailed"/>
    return (
        <div className="form-container">
        <h2>Add New Game</h2>
        <form className="my-form" noValidate>
            <div className="form-group">
            <label id="gamenameLabel">Game name</label>
            <input className="form-control"
                type="text"
                name="gamename"
                ref="gamename"
                placeholder="e.g. FIFA 2018"
                value={ this.state.gamename } 
                onChange={ this.handleChange }
                pattern="^[A-Za-z0-9 :_\x2D\x22\x27]*$"
                required />
            <div className="error" id="gamenameError" />
            </div>
            <div className="form-group">
            <label id="quantityLabel">Quantity</label>
            <input className="form-control"
                type="text" 
                name="quantity"
                ref="quantity"
                placeholder="e.g. 100"
                value={ this.state.quantity } 
                onChange={ this.handleChange }
                pattern="^[0-9]*$"
                required />
            <div className="error" id="quantityError" />
            </div>
            <div className="form-group">
            <label id="categoryLabel">category</label>
            <input className="form-control"
                type="text" 
                name="category"
                ref="category"
                placeholder="e.g. 3"
                value={ this.state.category } 
                onChange={ this.handleChange }
                pattern="^[0-9]*$"
                // pattern=".{5,}"
                required />
            <div className="error" id="categoryError" />
            </div>
            <div className="form-group">
            <label id="descriptionLabel">description</label>
            <textarea className="form-control"
                type="text" 
                name="description"
                ref="description"
                placeholder="e.g. A football video game"
                value={ this.state.description } 
                onChange={ this.handleChange }
                required />
            <div className="error" id="descriptionError" />
            </div>
            <div className="form-group">
            <label id="priceLabel">price</label>
            <input className="form-control"
                type="text" 
                name="price"
                ref="price"
                placeholder="e.g. 28"
                value={ this.state.price } 
                onChange={ this.handleChange }
                pattern="^[0-9.]*$"
                required />
            <div className="error" id="priceError" />
            </div>
            <div className="form-group">
            <label id="selectedFileLabel">Image</label>
            <input type="file" 
                name="selectedFile" 
                ref="selectedFile"
                onChange={this.fileChangedHandler} 
                required />
            <div className="error" id="selectedFileError" />           
            </div>
            <button className="btn btn-info defbtn"
            onClick={ this.handleSubmit }>submit</button>
            <button className="btn btn-secondary defbtn"
            onClick={ this.handleCancel }>cancel</button>
        </form>
        </div>
    );
    }
  }

export default Gameaddform;