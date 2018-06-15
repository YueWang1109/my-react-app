import React, { Component } from 'react';
import { getInventoryData } from '../utils/My_api';
import Mynav from './Nav';
import '../CSS/default.css';
import '../CSS/inventory.css';
import { Redirect } from 'react-router'
import GameTag from './game';
import { deleteGamebyID } from '../utils/My_api';

class Inventory extends Component {
    constructor() {
        super();
        debugger;
        this.state = { 
            games: [],
            authed: 1,
            isLoading: false,
            iserror: false,
            errmsg: null
        };
        this.sorthandle = this.sorthandle.bind(this);
    }
    getInventory(sortby){
        debugger;
        this.setState({ isLoading: true });
        getInventoryData(sortby).then((rcvdata) => {
            debugger;
            if(rcvdata)
            this.setState({
                games: rcvdata,
                authed: localStorage.getItem('authed'),
                isLoading: false
            });
        }).catch((error) => {
            debugger;
            if(error.response.status === 401){
                this.setState({
                    games: [],
                    authed: false,
                    isLoading: false
                });
            }else{
                this.setState({
                    iserror: true,
                    errmsg: error.response.statusText
                })
            }
        });
    }
    componentDidMount(){
        debugger;
        this.getInventory(0); //Default: sort by ProductName
    }
    deleteGame(id){
        this.setState({ isLoading: true });
        deleteGamebyID(id).then((rcvdata) => {
            debugger;
            console.log(JSON.stringify(rcvdata));
            if(rcvdata.affectedRows === 1)
                debugger;
                this.getInventory();
        }).catch((error) => {
            debugger;
            if(error.response.status === 401){
                this.setState({
                    games: [],
                    authed: false,
                    isLoading: false
                });
            }else{
                this.setState({
                    iserror: true,
                    errmsg: error.response.statusText
                })
            }
            if(error)
                throw error;
        });
    }

    sorthandle(e){
        debugger;
        this.setState({
            [e.target.name]: e.target.value
        })
        this.getInventory(e.target.value);
    }
    render() {
        if(!this.state.authed)
            return <Redirect to="/authfailed"/>
        if(this.state.iserror)
            return (
                <React.Fragment>
                    <Mynav  authed={this.state.authed}/>
                    <h3 className="warning">{this.state.errmsg}</h3>
                </React.Fragment>
            )
        if(this.state.isLoading)
            return (
                <div>
                    <Mynav/>
                    <div>
                    <p>Loading......</p>
                    </div>
                </div>
            )
        const { games } = this.state;
        return (
            <React.Fragment>
            <Mynav/>
            <div className="dropdown-container">
                <div className="sort">Sort By: </div>
                <div className="selectbox">
                    <select name="sortby" value={this.state.sortby} onChange={this.sorthandle}>
                        <option value="0">A-Z</option>
                        <option value="1">Z-A</option>
                        <option value="2">Price low to high</option>
                        <option value="3">Price high to low</option>
                    </select>
                </div>
            </div>
                {
                    games.map((curgame, curindex) => {
                        
                        return <GameTag key={curindex} game={curgame} usertype={this.state.authed} deleteGame={this.deleteGame.bind(this)}/>
                    }
                    )
                }
            </React.Fragment>
        );
    }
}

export default Inventory;