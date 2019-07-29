import React from 'react'

import { connect } from "react-redux"

import { Link } from "react-router-dom";

class newGame extends React.Component {

  render(){
    console.log(this.props);
    if (this.props.state.game === false){
      return (
        <div>
            <button className="button" onClick={this.props.handleGame}>New Game</button>
        </div>
      );
    }else if(this.props.players.filter(player=>player.name !== "none").length >3){
      return (
        <div>
          {this.props.players[0].game.id}<br/>
        {this.props.players.map((player,current) =>{
            return <p key={current}>{player.name}</p>
          })}
          <button> <Link to="/board">Start </Link></button>
        </div>
      );
    }else{
      return (
        <div>
          {this.props.players[0].game.id}<br/>
        {this.props.players.map((player,current) =>{
            return <p key={current}>{player.name}</p>
          })}
        </div>
      );
    }
  }
}


function msp(state){
  return {
    players: state.players,
    room: state.room,
    turn: state.turn
  }
}

function mdp(dispatch) {
  return{
  }
}

export default connect(msp,mdp)(newGame);
