import React from 'react'
import Damage from './damage.js'
import Field from './field.js'
import Action from './action.js'
import { connect } from "react-redux"


class board extends React.Component {

  componentDidMount(){
    this.props.handlePlayer(this.props.players[0])
    let turn = this.props.players[0]
    // this.props.handleTurn(turn)
    fetch(`http://localhost:4000/api/v1/games/${turn.game.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        turn,
        amountOfPlayer: this.props.players.filter(x=> x.name !== "none").length
      }),
    })
  }

  render(){
    console.log(this.props);
    return(
      <div>
        <Damage/>
        <Field/>
      </div>
    )
  }
}

function msp(state){
  return{
    players: state.players,
    turn: state.turn
  }
}

function mdp(dispatch){
  return{
    handlePlayer: (player) => {
      dispatch({type: "SELECTEDTURN", data: player})
    },
    handleTurn: (player)=>{
      dispatch({type: "TURN", data: player})
    }
  }
}

export default connect(msp,mdp)(board);
