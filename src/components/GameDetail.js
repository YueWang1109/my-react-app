import React, { Component } from 'react';
import '../CSS/default.css';
import { getGamebyID } from '../utils/My_api';
import { Redirect } from 'react-router'

class Gamedetail extends Component{
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

        if(this.state.isLoading||!this.state.game)
            return (
                <div>
                    <div>
                    <p>Loading......</p>
                    </div>
                </div>
            )
        return (
            <React.Fragment>
                <div className="gd-container">
                    <div className="gd-title page-title">
                    {this.state.game.ProductName}
                    </div>
                    <div className="gd-video">
                    <iframe title="game-video" width="800" height="500" src="https://www.youtube.com/embed/KI0MHwGzl6U" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                    <div className="gd-description">
                        {this.state.game.Description}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Gamedetail;