import React, { Component } from 'react';
import '../CSS/default.css';
import '../CSS/user.css';
import { Redirect } from 'react-router'
import { getUsersData, deleteUserbyID } from '../utils/My_api';
import UserTag from './user';

class Users extends Component {
    constructor() {
        super();
        debugger;
        this.state = { 
            users: [],
            authed: 1,
            isLoading: false,
            iserror: false,
            errmsg: null
        };
        this.sorthandle = this.sorthandle.bind(this);
    }
    getUsers(sortby){
        debugger;
        this.setState({ isLoading: true });
        getUsersData(sortby).then((rcvdata) => {
            debugger;
            if(rcvdata)
            this.setState({
                users: rcvdata,
                authed: localStorage.getItem('authed'),
                isLoading: false
            });
        }).catch((error) => {
            debugger;
            if(error.response.status === 401){
                this.setState({
                    users: [],
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
        this.getUsers(0); //Default: sort by uid
    }
    deleteUser(id){
        this.setState({ isLoading: true });
        deleteUserbyID(id).then((rcvdata) => {
            debugger;
            console.log(JSON.stringify(rcvdata));
            if(rcvdata.affectedRows === 1)
                debugger;
                this.getUsers();
        }).catch((error) => {
            debugger;
            if(error.response.status === 401){
                this.setState({
                    users: [],
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
        this.getUsers(e.target.value);
    }
    render() {
        if(!this.state.authed)
            return <Redirect to="/authfailed"/>
        if(this.state.iserror)
            return (
                <React.Fragment>
                    <h3 className="warning">{this.state.errmsg}</h3>
                </React.Fragment>
            )
        if(this.state.isLoading)
            return (
                <div>
                    <div>
                    <h2>Loading......</h2>
                    </div>
                </div>
            )
        const { users } = this.state;

        return (
                <React.Fragment>
            <div className="">
            <p className="page-title">
                User List
            </p>
                <div className="main-box no-header clearfix">
                    <div className="main-box-body clearfix">
                        <div className="table-responsive">
                            <table className="table user-list">
                                <thead>
                                    <tr>
                                    <th><span>User</span></th>
                                    <th><span>Created</span></th>
                                    <th className="text-center"><span>Phone</span></th>
                                    <th><span>Email</span></th>
                                    <th><span>Operate</span></th>
                                    <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    users.map((curuser, curindex) => {
                                        
                                        return <UserTag key={curindex} user={curuser} usertype={this.state.authed} deleteUser={this.deleteUser.bind(this)}/>
                                    }
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    </React.Fragment>
        );
        // return (
        //     <React.Fragment>
        //     <Mynav/>
        //     <div className="dropdown-container">
        //         <div className="sort">Sort By: </div>
        //         <div className="selectbox">
        //             <select name="sortby" value={this.state.sortby} onChange={this.sorthandle}>
        //                 <option value="0">A-Z</option>
        //                 <option value="1">Z-A</option>
        //                 <option value="2">Price low to high</option>
        //                 <option value="3">Price high to low</option>
        //             </select>
        //         </div>
        //     </div>
        //         {
        //             users.map((curuser, curindex) => {
                        
        //                 return <UserTag key={curindex} user={curuser} usertype={this.state.authed} deleteUser={this.deleteUser.bind(this)}/>
        //             }
        //             )
        //         }
        //     </React.Fragment>
        // );
    }
}

export default Users;