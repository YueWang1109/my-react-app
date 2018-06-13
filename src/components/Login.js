import React, { Component } from 'react';
import Nav from "./Nav";
import { LoginSubmit, setToken } from '../utils/My_api';
import "../CSS/default.css";
import "../CSS/login.css";
import { Redirect } from 'react-router'

class Login extends Component {  
  
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      warning: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetTheToken();
  }
  resetTheToken(){
    localStorage.clear();
    setToken(null);
  }
  resetState(){
    this.setState({
      email: "",
      password: "",
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
      LoginSubmit(this.state).then((data) => {
        //this.setState({isAuthenticated: true});
        if(data&&data.loggedin){
          console.log(data);
          localStorage.setItem('authed', data.type);
          localStorage.setItem('useremail', data.email);
          let token = data.token;
          debugger;
          if (token) {
            debugger;
            setToken(token);
            localStorage.setItem('jwt', token);
          } else {
            setToken(null);
            /*if setting null does not remove `Authorization` header then try     
            delete axios.defaults.headers.common['Authorization'];
            */
          }
          
          this.setState({
            redirect: true
          });
        }
        else{
          this.resetState();
          this.setState({
            wariningMsg: data.message
          });
        }
        console.log(`login state: ${this.state}`);
        
      }).catch(error => {
        throw error;
      });
    }
  }
  
  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;
    
    inputs.forEach(input => {
      input.classList.add('active');
      
      let isInputValid = (input.type==="button")?true:this.showInputError(input.name);
      
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
    
    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`; 
      } else if (validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`; 
      } else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} should be longer than 4 chars`; 
      }
      return false;
    }
    
    error.textContent = '';
    return true;
  }
  
  render() {
    const { redirect } = this.state
    if(redirect === true){
      return <Redirect to="/"/>
    }
    else {
      return (
        <React.Fragment>
        <Nav />
        <div className="form-container">
          <h2>Customer Login</h2>
          <div className="warning">
            { this.state.warning? this.state.wariningMsg : null }
          </div>
          <form className="my-form" noValidate>
            <div className="form-group">
              <label id="emailLabel">Email</label>
              <input className="form-control"
              type="email"
              name="email"
              ref="email"
              placeholder="Email"
              value={ this.state.email } 
              onChange={ this.handleChange }
              required />
              <div className="error" id="emailError" />
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

              <button className="btn btn-info defbtn"
                onClick={ this.handleSubmit }>submit</button>
            {/* <input type="button" name="submit" value="Submit" className="btn btn-outline-success defbtn"
            onClick={ this.handleSubmit }/> */}
          </form>
        </div>
        </React.Fragment>
      );
    }
  }
}

export default Login;