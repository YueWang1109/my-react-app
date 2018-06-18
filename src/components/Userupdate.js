import React, { Component } from 'react';
import { getUserbyID } from '../utils/My_api';
import Userupdatform from './UserUpdateForm';
import { Redirect } from 'react-router'

class Gameupdate extends Component {
    constructor(props){
        super(props);
        this.state={
            user: null,
            authed: true,
            isLoading: false
        };
    }

    componentDidMount(){
        this.gettheUser();
    }
    gettheUser(){
        debugger;
        this.setState({ isLoading: true });
        const {id} = this.props.match.params;
        if(id)
            getUserbyID(id).then((rcvdata) => {
                debugger;
                console.log(JSON.stringify(rcvdata));
                this.setState({
                    user: rcvdata,
                    authed: true,
                    isLoading: false
                })
            }).catch((error) => {
                debugger;
                this.setState({
                    user: null,
                    authed: false,
                    isLoading: false
                })
                if(error)
                    throw error;
            });
    }
    render(){
        if(!this.state.authed)
            return <Redirect to="/authfailed"/>
        debugger;
        if(this.state.isLoading||!this.state.user)
            return (
                <div>
                    <div>
                    <p>Loading......</p>
                    </div>
                </div>
            )
        return (
        <div>
                <React.Fragment>
                    {
                        this.state.user? 
                        <Userupdatform user={this.state.user}/>
                        :
                        <h3 className="warning">No such user!</h3>

                    }   
                </React.Fragment>
        </div>
        );
}
}

export default Gameupdate;