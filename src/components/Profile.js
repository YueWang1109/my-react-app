import React ,{ Component } from "react";
import Mynav from "./Nav";
import { Redirect } from 'react-router';
import "../CSS/default.css";
import { getUserInfo } from '../utils/My_api';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            userinfo: null,
            redirect: false
        }
    }
    componentDidMount(){
        getUserInfo().then(data => {
            debugger;
            if(data)
            this.setState({
                userinfo: data,
                redirect: false
            })
            else
            this.setState({
                redirect: true
            })
        }).catch(err => {
            this.setState({
                redirect: true
            })
            if(err) throw err;
        });
    }
    render(){
        //debugger;
        if(this.state.redirect)
        return <Redirect to="/"/>
        //console.log(`profile : ${this.props.location.state.authdata} isauthed: ${this.props.location.state.isAuthenticated}`);
        //debugger;
        return (
            <div>
            <Mynav/>
            <div  className="profile-container">
            <h2 className="profile-header">Profile page!</h2>
            <div className="profile-body">
            {
                this.state.userinfo?
                Object.entries(this.state.userinfo).map((element,index) =>(
                    <div className="profile-row">
                    <div className="profile-title">{element[0]} : </div>
                    <div className="profile-content"> {element[1]}</div>
                    </div>
                ))
                :
                <div>
                <p>Loading......</p>
                </div>
            }
            </div>
            </div>
            </div>
        );
    }
}

export default Profile;