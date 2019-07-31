import React from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux"


class Login extends React.Component {

  state={
    person: null,
    emi:false,
    ultra:false,
    move:false,
    attack: false,
    special:false
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
    this.setState({
      move:true
    })
  }
  specialAttack=(player)=>{

    if (player.character.name === "Wight"){
    let playerWithCharacter = this.props.players.filter(player => {return player.name !== "none"})
    let deadPlayer = playerWithCharacter.filter(singlePlayer=>{
      return singlePlayer.character.hp === 0
    }).length
    fetch(`http://localhost:4000/api/v1/games/${player.game.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Appect': 'application/json'
      },
      body: JSON.stringify({...player.game, wight:deadPlayer}),
    })
    }else if (player.character.name === "Vampire") {
      if(!!this.state.person){
        let target = this.props.players.find(player => player.id === parseInt(this.state.person))
        let damage = Math.abs(Math.ceil(Math.random()*6)-Math.ceil(Math.random()*4))
        fetch(`http://localhost:4000/api/v1/characters/${target.character.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Appect': 'application/json'
          },
          body: JSON.stringify({...target.character,damage:damage}),
        })
        if (damage !== 0){
          fetch(`http://localhost:4000/api/v1/characters/${player.character.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Appect': 'application/json'
            },
            body: JSON.stringify({...player.character,damage:-2}),
          })
        }
      }else{
        this.setState({
          special:false
        })
        alert("Please pick target")
      }
    }else if (player.character.name === "Ultra Soul") {
      let thisPlayer = this.props.players.find(player => player.id === this.props.player.id)
      let thesePlayers = this.props.players.filter(player => player.name !== "none")
      let underworldPlayer = thesePlayers.filter(player => {return (parseInt(player.character.location) === 4 || parseInt(player.character.location) === 5)})
debugger
      if (!underworldPlayer[0] && underworldPlayer[0] === thisPlayer){
        alert("No one is in underworld")
      }else{
        this.setState({
          ultra: true
        })
      }
    }else if (player.character.name === "Werewolf") {

    }else if (player.character.name === "Valkyrie") {
      let damage = Math.ceil(Math.random()*4)
      fetch(`http://localhost:4000/api/v1/characters/${this.state.player.character.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Appect': 'application/json'
        },
        body: JSON.stringify({...player.character,damage:damage}),
      })
    }else if (player.character.name === "Unknown") {
    }else if (player.character.name === "Ellen") {
    }else if (player.character.name === "Fu-ka") {
      if(!!this.state.person){
        let target = this.props.players.find(player => player.id === parseInt(this.state.person))
        fetch(`http://localhost:4000/api/v1/characters/${target.character.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Appect': 'application/json'
          },
          body: JSON.stringify({...target.character,damage:7}),
        })
      }else{
        this.setState({
          special:false
        })
        alert("Please pick target")
      }
    }else if (player.character.name === "George") {
      if(!!this.state.person){
        let target = this.props.players.find(player => player.id === parseInt(this.state.person))
        let damage = Math.ceil(Math.random()*4)
        fetch(`http://localhost:4000/api/v1/characters/${target.character.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Appect': 'application/json'
          },
          body: JSON.stringify({...target.character,damage:damage}),
        })
      }else{
        this.setState({
          special:false
        })
        alert("Please pick target")
      }
    }else if (player.character.name === "Gregor") {
    }else if (player.character.name === "Emi") {
      if (player.character.location === null){
        alert("Cannot use on turn 1")
      }else{
        this.setState({
          emi:true
        })
      }
    }else if (player.character.name === "Franklin") {
    }else if (player.character.name === "David") {
    }else if (player.character.name === "Bryan") {
    }else if (player.character.name === "Agnes") {
    }else if (player.character.name === "Charles") {
      if(!!this.state.person){
        let target = this.props.players.find(player=>player.id === parseInt(this.state.person))
        let damage =Math.abs(Math.ceil(Math.random()*6)-Math.ceil(Math.random()*4))
        console.log(damage);
        fetch(`http://localhost:4000/api/v1/characters/${target.character.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Appect': 'application/json'
          },
          body: JSON.stringify({...target.character,damage:damage}),
        }).then(r=>r.json())
        .then(data =>{
          damage =Math.abs(Math.ceil(Math.random()*6)-Math.ceil(Math.random()*4))
          console.log(damage);
          fetch(`http://localhost:4000/api/v1/characters/${target.character.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Appect': 'application/json'
            },
            body: JSON.stringify({...target.character,damage:damage}),
          })
        })
      }else{
        this.setState({
          special:false
        })
        alert("Please pick target")
      }
    }else if (player.character.name === "Daniel") {
    }else if (player.character.name === "Catherine") {
    }else if (player.character.name === "Allie") {
      console.log(this.props);
      fetch(`http://localhost:4000/api/v1/characters/${player.character.id}`, {
         method: 'PATCH',
         headers: {
             'Content-Type': 'application/json',
             'Appect': 'application/json'
         },
         body: JSON.stringify({...player.character,damage:"allie"}),
       })
    }
    this.setState({
      special:true
    })
  }

  attackNumber=(e)=>{
    e.preventDefault()
    if(!!this.state.person){
      console.log(this.state.person);
      let player = this.props.players.find(player=>player.id === parseInt(this.state.person))
      let damage =Math.abs(Math.ceil(Math.random()*6)-Math.ceil(Math.random()*4))
      console.log(damage);
      fetch(`http://localhost:4000/api/v1/characters/${player.character.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Appect': 'application/json'
        },
        body: JSON.stringify({...player.character,damage:damage}),
      })
      this.setState({
        attack:true
      })
    }else {
      alert("Please pick a target")
    }
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
    this.setState({
      move:false,
      attack: false,
      special: false
    })
  }
  emiMove=(location, player)=>{
    fetch(`http://localhost:4000/api/v1/characters/${player.character.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Appect': 'application/json'
      },
      body: JSON.stringify({...player.character,location:location}),
    })
    this.setState({
      emi:false
    })
  }

  ultraSpecial=(playerId)=>{
    let target = this.props.players.find(player =>{return player.id === parseInt(playerId)})
    fetch(`http://localhost:4000/api/v1/characters/${target.character.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Appect': 'application/json'
      },
      body: JSON.stringify({...target.character,damage:3}),
    })
    this.setState({
      ultra:false
    })
  }

  render(){
    console.log(this.props);
    let thisPlayer = this.props.players.find(player => player.id === this.props.player.id)
    let allPlayer = this.props.players.filter(player => player.name !== "none")
    if(this.state.ultra){
      let underworldPlayer = allPlayer.filter(player => player.id !== thisPlayer.id && (player.character.location === 4 || player.character.location === 5))
      return(
      <div>
        {
          underworldPlayer.map(player=>{
            return(
                <button key={player.id} type="button" onClick={e=>this.ultraSpecial(e.target.value)} value = {player.id}>{player.name}</button>
            )
          })
        }
      </div>
    )}
    if(this.state.emi){
      const locationToName ={2:"Hermit's Cabin", 3:"Hermit's Cabin", 4:"Underworld Gate", 5:"Underworld Gate", 6:"Church", 8:"Cemetery", 9:"Werid woods", 10:"Erstwhile Altar"}
      const nameToLocation ={"Hermit's Cabin":2, "Hermit's Cabin":3, "Underworld Gate":4, "Underworld Gate":5, "Church":6, "Cemetery":8, "Werid woods":9, "Erstwhile Altar":10}
      let playerPostion = thisPlayer.game.field.findIndex(field => field === thisPlayer.character.location)
      let add = 1;
      let subtract = 1;
      if (thisPlayer.character.location === 2 || thisPlayer.character.location === 4){
        add = 2
      }else if (thisPlayer.character.location === 3 || thisPlayer.character.location === 5) {
        subtract = 2
      }
      let high;
      let low;
      if (playerPostion+add >= 8){
        high = 0
      }else{
        high = playerPostion+add
      }
      if (playerPostion-subtract < 0 ){
        low = 7
      }else{
        low = playerPostion-subtract
      }
      return(
      <div>
        <button type="button" onClick={e=>this.emiMove(e.target.value,thisPlayer)} value = {thisPlayer.game.field[high]}> {locationToName[thisPlayer.game.field[high]]} </button><br/>
        <button type="button" onClick={e=>this.emiMove(e.target.value,thisPlayer)} value = {thisPlayer.game.field[low]}> {locationToName[thisPlayer.game.field[low]]} </button><br/>
      </div>
    )}
    if (!!this.props.player.id && this.props.turn.id === this.props.player.id && this.state.move === false){

      let otherPlayer = allPlayer.filter(player => player.id !== thisPlayer.id)
      console.log(thisPlayer.character.name);
      return(
        <div>
        Name:{thisPlayer.character.name}<br/>
        Alliance:{thisPlayer.character.alliance}<br/>
        HP:{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
        Win condition:{thisPlayer.character.win_condition}<br/>
        Ability:{thisPlayer.character.ability}<br/>
        <button type="button" onClick={e=>{this.moveNumber(thisPlayer)}} >Move</button><br/>
        {(thisPlayer.character.name === "Emi")?<button type="button" onClick={e=>this.specialAttack(thisPlayer)} >Special</button>:null}
        </div>
      )
    }else if(!!this.props.player.id && this.props.turn.id === this.props.player.id && this.state.attack === false && this.state.special === false){
      let otherPlayer = allPlayer.filter(player => player.id !== thisPlayer.id)
      return(
      <div>
        Name:{thisPlayer.character.name}<br/>
        Alliance:{thisPlayer.character.alliance}<br/>
        HP:{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
        Win condition:{thisPlayer.character.win_condition}<br/>
        Ability:{thisPlayer.character.ability}<br/>
            <form onChange={e=>this.handleTarget(e.target.value)} onSubmit={this.attackNumber}>
              <select>
                <option >--please select a target--</option>
                {
                  otherPlayer.map(player=>{
                    return(
                      <option key={player.id} value={player.id}>{player.name}</option>
                    )
                  })
                }
              </select>
              <input type="submit" value="attack"></input>
            </form>
          {(thisPlayer.character.name !== "Emi")?<button type="button" onClick={e=>this.specialAttack(thisPlayer)} >Special</button>:null}
          <button type="button" onClick={e => this.endTurn(thisPlayer)}>End trun</button><br/>
      </div>
      )
    }else if(!!this.props.player.id && this.props.turn.id === this.props.player.id && this.state.attack === true && this.state.special === false){
      let otherPlayer = allPlayer.filter(player => player.id !== thisPlayer.id)
      return(
      <div>
        Name:{thisPlayer.character.name}<br/>
        Alliance:{thisPlayer.character.alliance}<br/>
        HP:{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
        Win condition:{thisPlayer.character.win_condition}<br/>
        Ability:{thisPlayer.character.ability}<br/>
            <form onChange={e=>this.handleTarget(e.target.value)} onSubmit={this.attackNumber}>
              <select>
                <option >--please select a target--</option>
                {
                  otherPlayer.map(player=>{
                    return(
                      <option key={player.id} value={player.id}>{player.name}</option>
                    )
                  })
                }
              </select>
            </form>
          {(thisPlayer.character.name !== "Emi")?<button type="button" onClick={e=>this.specialAttack(thisPlayer)} >Special</button>:null}
          <button type="button" onClick={e => this.endTurn(thisPlayer)}>End trun</button><br/>
      </div>
      )
    }else if(!!this.props.player.id && this.props.turn.id === this.props.player.id && this.state.attack === false && this.state.special === true){
      let otherPlayer = allPlayer.filter(player => player.id !== thisPlayer.id)
      return(
      <div>
        Name:{thisPlayer.character.name}<br/>
        Alliance:{thisPlayer.character.alliance}<br/>
        HP:{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
        Win condition:{thisPlayer.character.win_condition}<br/>
        Ability:{thisPlayer.character.ability}<br/>
            <form onChange={e=>this.handleTarget(e.target.value)} onSubmit={this.attackNumber}>
              <select>
                <option >--please select a target--</option>
                {
                  otherPlayer.map(player=>{
                    return(
                      <option key={player.id} value={player.id}>{player.name}</option>
                    )
                  })
                }
              </select>
              <input type="submit" value="attack"></input>
            </form>
          <button type="button" onClick={e => this.endTurn(thisPlayer)}>End trun</button><br/>
      </div>
      )
    }else if(!!this.props.player.id && this.props.turn.id === this.props.player.id && this.state.attack === true && this.state.special === true){
      let otherPlayer = allPlayer.filter(player => player.id !== thisPlayer.id)
      return(
      <div>
        Name:{thisPlayer.character.name}<br/>
        Alliance:{thisPlayer.character.alliance}<br/>
        HP:{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
        Win condition:{thisPlayer.character.win_condition}<br/>
        Ability:{thisPlayer.character.ability}<br/>
          <button type="button" onClick={e => this.endTurn(thisPlayer)}>End trun</button><br/>
      </div>
      )
    } else if (!!this.props.player.id && thisPlayer.character) {
      console.log(this.props.player);
      return(
        <div>
          Name:{thisPlayer.character.name}<br/>
          Alliance:{thisPlayer.character.alliance}<br/>
          HP:{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
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
    turn: state.turn,
    damage: state.damage,
    field: state.field
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
