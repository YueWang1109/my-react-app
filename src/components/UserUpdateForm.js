import React, { Component } from 'react';
import "../CSS/default.css";
import "../CSS/login.css";
import { updateUser } from '../utils/My_api';
import { Redirect } from 'react-router'

class Userupdatform extends Component { 
  
  constructor(props) {
    super(props);
    
    this.state = {
      uid: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zip: '',
      role: '',
      authed: true,
      redirect: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount(){
    let id = this.props.user.iduser;
    let firstname = this.props.user.Firstname;
    let lastname = this.props.user.Lastname;
    let email = this.props.user.Email;
    let phone = this.props.user.Phone;
    let address = this.props.user.Address;
    let city = this.props.user.City;
    let zip = this.props.user.Zipcode;
    let role = this.props.user.role;
    this.setState({
      uid: id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      address: address,
      city: city,
      zip: zip,
      role: role,
      
    })
  }
  resetState(){
    this.setState({
      uid: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zip: '',
      role: '',
      authed: true,
      redirect: false
    })
  }
  handleCancel() {
    this.setState({
      redirect: true
    });
  }
  handleChange(e) {
    debugger;
    e.target.classList.add('active');
    
    this.setState({
      [e.target.name]: e.target.value
    });
    
    this.showInputError(e.target.name);
  }
  
  handleSubmit(e) {    
    e.preventDefault();
    debugger;
    console.log('component state', JSON.stringify(this.state));
    
    if (!this.showFormErrors()) {
      console.log('form is invalid: do not submit');
    } else {            
      debugger;
      updateUser(this.state).then((data) => {
        debugger;
        //this.setState({isAuthenticated: true});
        if(data.affectedRows === 1){
          debugger;
          this.setState({
            authed: true,
            redirect: true
          });
          window.confirm("Update success.");
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
      return <Redirect to="/users"/>
    }
    debugger;
    if(!this.state.authed)
    return <Redirect to="/authfailed"/>
    debugger;
    return (
      <div className="form-container">
      <h2>User Update</h2>
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
      <label id="phoneLabel">Telephone</label>
      <input className="form-control"
      type="text" 
      name="phone"
      ref="phone"
      placeholder="phone"
      value={ this.state.phone } 
      onChange={ this.handleChange }
      required />
      <div className="error" id="phoneError" />
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
      <label id="zipLabel">Zip code</label>
      <input className="form-control"
      type="text" 
      name="zip"
      ref="zip"
      placeholder="zip"
      value={ this.state.zip } 
      onChange={ this.handleChange }
      pattern="^[0-9.]*$"
      required />
      <div className="error" id="zipError" />
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

export default Userupdatform;