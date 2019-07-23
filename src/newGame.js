import React from 'react'

import { connect } from "react-redux"
import { ActionCable } from 'react-actioncable-provider';

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
    }else{
      return (
        <div>

        <form >
            <label>
              Player1:
              <input onChange={e=>this.props.handlePlayerName(e.target.value,0)} type="text" name="player1" value={this.props.players[0].name}/>
            </label><br/>
            <label>
              Player2:
              <input onChange={e=>this.props.handlePlayerName(e.target.value,1)}  type="text" name="player2" value={this.props.players[1].name}/>
            </label><br/>
            <label>
              Player3:
              <input onChange={e=>this.props.handlePlayerName(e.target.value,2)}  type="text" name="player3" value={this.props.players[2].name}/>
            </label><br/>
            <label>
              Player4:
              <input onChange={e=>this.props.handlePlayerName(e.target.value,3)}  type="text" name="player4" value={this.props.players[3].name}/>
            </label><br/>
            <label>
              Player5:
              <input onChange={e=>this.props.handlePlayerName(e.target.value,4)}  type="text" name="player5" value={this.props.players[4].name}/>
            </label><br/>
            <label>
              Player6:
              <input onChange={e=>this.props.handlePlayerName(e.target.value,5)}  type="text" name="player6" value={this.props.players[5].name}/>
            </label><br/>
            <label>
              Player7:
              <input onChange={e=>this.props.handlePlayerName(e.target.value,6)}  type="text" name="player7" value={this.props.players[6].name}/>
            </label><br/>
            <label>
              Player8:
              <input onChange={e=>this.props.handlePlayerName(e.target.value,7)}  type="text" name="player8" value={this.props.players[7].name}/>
            </label><br/>
            <Link to="/board">
            <input type="submit" value="Submit" />
            </Link>
          </form>
        </div>
      );
    }
  }
}


function msp(state){
  return{
    players: state.players
  }
}

function mdp(dispatch){
  return{
    handlePlayerName: (name, number) => {
      dispatch({type: "PLAYERNAME", data: {name: name, number: number }})
    }
  }
}

export default connect(msp,mdp)(newGame);


// {this.props.players[0].game.id}<br/>
// {this.props.players[0].name}<br/>
// {this.props.players[1].name}<br/>
// {this.props.players[2].name}<br/>
// {this.props.players[3].name}<br/>
// {this.props.players[4].name}<br/>
// {this.props.players[5].name}<br/>
// <button> <Link to="/board">Start </Link></button>



// <ActionCable
//   channel={{ channel: 'GamesChannel', game: this.props.players[0].game_id}}
//   onReceived={console.log("ASDASD")}
// />
