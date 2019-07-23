import React from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux"


class Login extends React.Component {
  handleName=(name)=>{
    fetch('http://localhost:4000/api/v1/players')
      .then(r=>r.json())
      .then(data=> {
        let allPlayer = data.filter(player => {
          return (player.game_id == data[data.length-1].game.id)
        })
        this.props.handleplayers(allPlayer)
      })
      .then(r => {
        let person = this.props.players.find(player => player.name === "none")
        if(person !== undefined){
          person.name = name
          fetch(`http://localhost:4000/api/v1/players/${person.id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Appect': 'application/json'
              },
              body: JSON.stringify({...person}),
          })
          .then(response => response.json())
          .then(data => {
            this.props.handleSelctedPlayer(data)
          })
        }else{
          alert("Max players");
        }
      })
  }

  moveNumber=()=>{
    let location = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*4)
    console.log(location)
    if (location === 7){
    }
  }

  attackNumber=()=>{
    console.log(Math.abs(Math.ceil(Math.random()*6)-Math.ceil(Math.random()*4)));
  }


  render(){
    console.log(this.props);
    if(!!this.props.player){
      return(
      <div>
        <button type="button" onClick={this.moveNumber} >Move</button><br/>
        <button type="button" onClick={this.attackNumber} >Attack</button><br/>
        <button type="button">Special</button><br/>
        <button type="button">End trun</button><br/>
      </div>
      )
    }else{
      return(
        <div>
          <form onSubmit={(e)=>{
              e.preventDefault()
              this.handleName(e.target[0].value)
            }}>
            <label>
              Name:
              <input type="text" name="name"/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }}
}

function msp(state){
  return{
    players: state.players,
    room: state.room,
    player: state.player
  }
}

function mdp(dispatch){
  return{
    handleplayers: (players) => {
      dispatch({type: "PLAYERS", data: players})
    },
    handleSelctedPlayer: (player) =>{
      dispatch({type: "SELECTEDPLAYER", data: player})
    }
  }
}

export default connect(msp,mdp)(Login);
