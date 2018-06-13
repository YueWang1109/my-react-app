import React, { Component } from 'react';
import Mynav from "./Nav";
import "../CSS/default.css";
import "../CSS/login.css";
import { register } from '../utils/My_api';
import { Redirect } from 'react-router'

class Register extends Component { 

    constructor(props) {
        super(props);
        
        this.state = {
            firstname: '',
            lastname: '',
            password: '',
            passwordcf: '',
            email: '',
            telephone: '',
            address: '',
            city: '',
            zipcode: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      resetState(){
        this.setState({
            firstname: '',
            lastname: '',
            password: '',
            passwordcf: '',
            email: '',
            telephone: '',
            address: '',
            city: '',
            zipcode: '',
            warning: true,
            redirect: false
        })
    }
      handleChange(e) {
        e.target.classList.add('active');
        
        this.setState({
          [e.target.name]: e.target.value
        });
        
        this.showInputError(e.target.name);
      }
      
      handleSubmit(e) {    
        e.preventDefault();
        
        console.log('component state', JSON.stringify(this.state));
        
        if (!this.showFormErrors()) {
          console.log('form is invalid: do not submit');
        } else {            
            debugger;
            register(this.state).then((data) => {
            //this.setState({isAuthenticated: true});
            if(data.affectedRows === 1){
              debugger;
              this.setState({
                  redirect: true
              });
              window.confirm("Register success! Please login.");
            }
            else{
                this.resetState();
            }
            console.log(`login state: ${this.state}`);
                
        }).catch((error)=>{
          window.confirm("this email address already registered.");
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
            return <Redirect to="/login"/>
        }
        return (
        <React.Fragment>
          <Mynav />
          <div className="form-container">
            <h2>Registration</h2>
            <form className="my-form" novalidate>
              <div className="form-group">
                <label id="firstnameLabel">Firstname</label>
                <input className="form-control"
                  type="text"
                  name="firstname"
                  ref="firstname"
                  placeholder="firstname"
                  value={ this.state.firstname } 
                  onChange={ this.handleChange }
                  pattern="^[A-Za-z\x2D\x22\x27]*$"
                  required />
                <div className="error" id="firstnameError" />
              </div>
              <div className="form-group">
                <label id="lastnameLabel">Lastname</label>
                <input className="form-control"
                  type="text" 
                  name="lastname"
                  ref="lastname"
                  placeholder="lastname"
                  value={ this.state.lastname } 
                  onChange={ this.handleChange }
                  pattern="^[A-Za-z\x2D\x22\x27]*$"
                  required />
                <div className="error" id="lastnameError" />
              </div>
              <div className="form-group">
                <label id="passwordLabel">Password</label>
                <input className="form-control"
                  type="password" 
                  name="password"
                  ref="password"
                  placeholder="password"
                  value={ this.state.password } 
                  onChange={ this.handleChange }
                  pattern=".{5,}"
                  required />
                <div className="error" id="passwordError" />
              </div>
              <div className="form-group">
                <label id="passwordConfirmLabel">Confirm Password</label>
                <input className="form-control"
                  type="password" 
                  name="passwordConfirm"
                  ref="passwordConfirm"
                  placeholder="passwordConfirm"
                  value={ this.state.passwordConfirm } 
                  onChange={ this.handleChange }
                  required />
                <div className="error" id="passwordConfirmError" />
              </div>
              <div className="form-group">
                <label id="emailLabel">Email</label>
                <input className="form-control"
                  type="email" 
                  name="email"
                  ref="email"
                  placeholder="email"
                  value={ this.state.email } 
                  onChange={ this.handleChange }
                  required />
                <div className="error" id="emailError" />
              </div>
              <div className="form-group">
                <label id="telephoneLabel">Telephone</label>
                <input className="form-control"
                  type="text" 
                  name="telephone"
                  ref="telephone"
                  placeholder="telephone"
                  value={ this.state.telephone } 
                  onChange={ this.handleChange }
                  required />
                <div className="error" id="telephoneError" />
              </div>
              <div className="form-group">
                <label id="addressLabel">Address</label>
                <input className="form-control"
                  type="text" 
                  name="address"
                  ref="address"
                  placeholder="address"
                  value={ this.state.address } 
                  onChange={ this.handleChange }
                  required />
                <div className="error" id="addressError" />
              </div>
              <div className="form-group">
                <label id="cityLabel">City</label>
                <input className="form-control"
                  type="text" 
                  name="city"
                  ref="city"
                  placeholder="city"
                  value={ this.state.city } 
                  onChange={ this.handleChange }
                  required />
                <div className="error" id="cityError" />
              </div>
              <div className="form-group">
                <label id="zipcodeLabel">Zip code</label>
                <input className="form-control"
                  type="text" 
                  name="zipcode"
                  ref="zipcode"
                  placeholder="zipcode"
                  value={ this.state.zipcode } 
                  onChange={ this.handleChange }
                  pattern="^[0-9.]*$"
                  required />
                <div className="error" id="zipcodeError" />
              </div>
              <button className="btn btn-info defbtn"
                onClick={ this.handleSubmit }>submit</button>
            </form>
          </div>
        </React.Fragment>
        );
      }
  }

export default Register;