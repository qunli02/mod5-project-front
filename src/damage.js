import React from 'react'
import { connect } from "react-redux"
import "./damage.css"

class damage extends React.Component {


  render(){
    const validPlayers = this.props.players.filter(player => player.name !== "none")
    const players = validPlayers.map(p => {return {damage: p.character.damage, color: p.color}})

    return(
      <table>
        <tbody>
        <tr>
          <th colSpan="2">Damage</th>
        </tr>


        {
          Array.from(Array(8).keys()).map((ele, index) => {

            return (
              <tr key={index}>
                <td>{index}
                <div className="row">
                  {
                    players.filter(player => player.damage === index).map(player => <div id={`player-${player.color}`}></div>)
                  }
                </div></td>
                <td>{index +8}
                  <div className="row">
                    {
                      players.filter(player => player.damage === index+8).map(player => <div id={`player-${player.color}`}></div>)
                    }
                  </div>
                </td>
              </tr>
            )
          })
        }
        </tbody>
        </table>
    )
  }
}

function msp(state){
  return{
    players: state.players,
  }
}

function mdp(dispatch){
  return{
  }
}


export default connect(msp,mdp)(damage);
