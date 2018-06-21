import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserTag extends Component {
    constructor(prop){
        super(prop);
        this.state={
            id: null
        };
    }
    
    deleteUser(){
        let id = this.props.user.iduser;
        debugger;
        if(id)
        this.props.deleteUser(id);
    }
    render(){
        let {Firstname, Lastname, Email, creattime, Phone, Address, City, Zipcode,role} = this.props.user;
        let strCreattime = `${creattime}`;
        strCreattime = strCreattime.substring(0,10);
        debugger;
        let updateurl = `/user_update/${this.props.user.iduser}`
        return (
            <tr>
                                    <td>
                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt=""/>
                                        <a href={updateurl} className="user-link">{Firstname} {Lastname}</a>
                                        {
                                            role >= 2?
                                            (
                                                role === 3?
                                                <span class="user-subhead">Admin</span>
                                                :
                                                <span class="user-subhead">Project Manager</span>
                                            )
                                            :
                                            <span class="user-subhead">Member</span>
                                        }
                                    </td>
                                    <td>{strCreattime}</td>
                                    <td className="text-center">
                                        {Phone}
                                    </td>
                                    <td>
                                        <a href="mailto:{Email}">{Email}</a>
                                    </td>
                                    <td className="user-operation">
                                        <Link to={updateurl}>update</Link>   
                                        <a className="delet-button" onClick={this.deleteUser.bind(this)}>delete</a>
                                    </td>
                                </tr>
        )
        
    }
}

export default UserTag;