import React from 'react'
import "./field.css"
import { connect } from "react-redux"


class Field extends React.Component {
  render(){
    let allPlayers = this.props.players.filter(player => player.name !=="none")
    let realPlayer = this.props.players.find(player => player.name !=="none")
    let fields=[[2],[4],[6],[8],[9],[10]]
    if (realPlayer && realPlayer.game.field){
      let shortfields = realPlayer.game.field.filter(field => field !== 3 && field !== 5)
      fields = shortfields.map(field => field === 2?[2,3]:field === 4?[4,5]:[field])
    }

    return(
      <div>
        <div className="field-row">
          <div className="field-pair top-row">
            <div className="field">
              <img src={require(`./images/${fields[0][0]}.jpg`)} className="field-background" />
              <div className ="player-display">
                {allPlayers.filter(player => fields[0].includes(player.character.location)).map(player => <div className="field-players" id={`player-${player.color}`}></div>)}
              </div>
            </div>
            <div className="field">
              <img src={require(`./images/${fields[1][0]}.jpg`)} className="field-background" />
              <div className ="player-display">
                {allPlayers.filter(player => fields[1].includes(player.character.location)).map(player => <div className="field-players" id={`player-${player.color}`}></div>)}
              </div>
            </div>
          </div>
        </div>
        <div className="field-row bottom-row">
          <div className="field-pair first">
            <div className="field">
              <img src={require(`./images/${fields[4][0]}.jpg`)} className="field-background" />
              <div className ="player-display">
                {allPlayers.filter(player => fields[4].includes(player.character.location)).map(player => <div className="field-players" id={`player-${player.color}`}></div>)}
              </div>
            </div>
            <div className="field">
              <img src={require(`./images/${fields[5][0]}.jpg`)} className="field-background" />
              <div className ="player-display">
                {allPlayers.filter(player => fields[5].includes(player.character.location)).map(player => <div className="field-players" id={`player-${player.color}`}></div>)}
              </div>
            </div>
          </div>
          <div className="field-pair second">
            <div className="field">
              <img src={require(`./images/${fields[2][0]}.jpg`)} className="field-background" />
              <div className ="player-display">
                {allPlayers.filter(player => fields[2].includes(player.character.location)).map(player => <div className="field-players" id={`player-${player.color}`}></div>)}
              </div>
            </div>
            <div className="field">
              <img src={require(`./images/${fields[3][0]}.jpg`)} className="field-background" />
              <div className ="player-display">
                {allPlayers.filter(player => fields[3].includes(player.character.location)).map(player => <div className="field-players" id={`player-${player.color}`}></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function msp(state){
  return{
    players: state.players,
    field: state.field
  }
}

export default connect(msp)(Field);
