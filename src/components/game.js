import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameTag extends Component {
    constructor(prop){
        super(prop);
        this.state={
            id: null
        };
    }

    deleteGame(){
        let id = this.props.game.idinventory;
        debugger;
        if(id)
            this.props.deleteGame(id);
    }
    render(){
        debugger;
        // if(this.state.redirect === true){
        //     return <Redirect to="/login"/>
        // }
        let updateurl = `/game_update/${this.props.game.idinventory}`;
        let productdetailurl = `/game_detail/${this.props.game.idinventory}`;
        // let imgurl = this.props.imgurl;
        let imgurl = `https://localhost:8443/public/${this.props.game.imagename}`;
        let ProductName = this.props.game.ProductName;
        let Description = this.props.game.Description;
        let Price = this.props.game.Price;
        return (
            <div className="programContainer">
            <div className="program-thumb">
                <img className="img-container" alt="can't load" src={imgurl}/>
            </div>
            <div className="program-intr">
                <div className="program-left">
                    <div className="game-title"><Link to={productdetailurl}>{ProductName}</Link></div>
                    <div className="game-des">{Description}</div>
                    </div>
                <div className="program-right">
                    <div className="game-price">${Number(Price).toFixed(2)}</div>
                    {   
                        this.props.usertype >= "2"?     //manager or admin!
                        <div className="game-operation">
                        <Link to={updateurl}>edit</Link> |  
                        <a className="delet-button" onClick={this.deleteGame.bind(this)}>delete</a>
                        </div>
                        :
                        null
                    }                   
                </div>
            </div>
            </div>
            
        );
    }
}

export default GameTag;