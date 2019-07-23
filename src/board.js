import React from 'react'
import Damage from './damage.js'
import Field from './field.js'
import Action from './action.js'
import { connect } from "react-redux"

class board extends React.Component {

  componentDidMount(){
    this.props.handlePlayer(this.props.players[0])
  }

  render(){
    return(
      <div>
        <Damage/>
        <Field/>
        <Action/>
      </div>
    )
  }
}

function msp(state){
  return{
    players: state.players,
    player: state.player
  }
}

function mdp(dispatch){
  return{
    handlePlayer: (player) => {
      dispatch({type: "SELECTEDPLAYER", data: player})
    }
  }
}

export default connect(msp,mdp)(board);
