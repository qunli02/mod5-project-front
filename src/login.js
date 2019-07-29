import React from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux"


class Login extends React.Component {

  state={
    person: null
  }

  handleTarget= (person)=>{
    this.setState({
      person:person
    })
  }

  handleName=(name)=>{
    fetch('http://localhost:4000/api/v1/players')
    .then(r=>r.json())
    .then(data=> {
      let sorted = data.sort((a,b)=>{
        return a.game_id-b.game_id
      })
      let allPlayer = sorted.filter(player => {
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
          // fetch(`http://localhost:4000/api/v1/characters/${data.character.id}`, {
          //   method: 'PATCH',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Appect': 'application/json'
          //   },
          //   body: JSON.stringify({hp:10}),
          // })
          this.props.handleSelctedPlayer(data)
        })
      }else{
        alert("Max players");
      }
    })
  }


  moveNumber=(player)=>{
    let location = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*4)
    console.log(location)
    if (location === 7){
    }
    fetch(`http://localhost:4000/api/v1/characters/${player.character.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Appect': 'application/json'
      },
      body: JSON.stringify({...player.character,location:location}),
    })
  }

  attackNumber=(e)=>{
    e.preventDefault()
    console.log(this.state.person);
    let damage =Math.abs(Math.ceil(Math.random()*6)-Math.ceil(Math.random()*4))
    debugger
    console.log(damage);
    // fetch(`http://localhost:4000/api/v1/players/${this.state.person}`, {
    //   method: 'PATCH',
    //   headers: {
    //       'Content-Type': 'application/json',
    //       'Appect': 'application/json'
    //   },
    //   body: JSON.stringify({...this.propsplayer.character,damage:damage}),
    // })
  }

  endTurn=(player)=> {
    let sort = this.props.players.sort((a,b)=> a.id - b.id)
    let postin = sort.findIndex(x => x.id === player.id)
    postin += 1
    let turn;
    let playerAmount= this.props.players.filter(x=>x.name !== "none").length
    if(postin < playerAmount){
     turn=this.props.players[postin]
    }else{
     turn=this.props.players[0]
    }
    fetch(`http://localhost:4000/api/v1/games/${turn.game.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        turn
      }),
    })
  }


  render(){
    console.log(this.props);
    let thisPlayer = this.props.players.find(player => player.id === this.props.player.id)
    let allPlayer = this.props.players.filter(player => player.name !== "none")
    if(!!this.props.player.id && this.props.turn.id === this.props.player.id){
      return(
      <div>
        Name:{thisPlayer.character.name}<br/>
        Alliance:{thisPlayer.character.alliance}<br/>
        HP:{thisPlayer.character.hp}<br/>
        Win condition:{thisPlayer.character.win_condition}<br/>
        Ability:{thisPlayer.character.ability}<br/>
      <button type="button" onClick={e=>{this.moveNumber(thisPlayer)}} >Move</button><br/>
          // <button type="button" onClick={this.attackNumber}>Attack</button><br/>
            <form onChange={e=>this.handleTarget(e.target.value)} onSubmit={this.attackNumber}>
              <select>
                <option >--please select a target--</option>
                {
                  allPlayer.map(player=>{
                    return(
                      <option key={player.id} value={player.id}>{player.name}</option>
                    )
                  })
                }
              </select>
              <input type="submit" value="attack"></input>
            </form>
          <button type="button">Special</button><br/>
          <button type="button" onClick={e => this.endTurn(this.props.player)}>End trun</button><br/>
      </div>
      )
    }else if (!!this.props.player.id) {
      return(
        <div>
          Name:{thisPlayer.character.name}<br/>
          Alliance:{thisPlayer.character.alliance}<br/>
          HP:{thisPlayer.character.hp}<br/>
          Win condition:{thisPlayer.character.win_condition}<br/>
          Ability:{thisPlayer.character.ability}<br/>
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
    player: state.player,
    turn: state.turn
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
