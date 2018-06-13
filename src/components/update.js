import React, { Component } from 'react';
import Mynav from './Nav';
import { getGamebyID } from '../utils/My_api';
import Gameupdateform from './GameUpdateForm';
import { Redirect } from 'react-router'

class Update extends Component {
    constructor(props){
        super(props);
        this.state={
            game: null,
            authed: true,
            isLoading: false
        };
    }

    componentDidMount(){
        this.gettheGame();
    }
    gettheGame(){
        debugger;
        this.setState({ isLoading: true });
        const {id} = this.props.match.params;
        if(id)
            getGamebyID(id).then((rcvdata) => {
                debugger;
                console.log(JSON.stringify(rcvdata));
                this.setState({
                    game: rcvdata,
                    authed: true,
                    isLoading: false
                })
            }).catch((error) => {
                debugger;
                this.setState({
                    game: null,
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
        if(this.state.isLoading||!this.state.game)
            return (
                <div>
                    <Mynav/>
                    <div>
                    <p>Loading......</p>
                    </div>
                </div>
            )
        return (
        <div>
                <React.Fragment>
                    <Mynav/>             
                    {
                        this.state.game[0]? 
                        <Gameupdateform game={this.state.game[0]}/>
                        :
                        <h3 className="warning">No such game!</h3>

                    }   
                </React.Fragment>
        </div>
        );
}
}

export default Update;