import React, { Fragment } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux"
import { API_ROOT } from './constants';
import "./login.css"


class Login extends React.Component {

  state={
    person: null,
    emi:false,
    ultra:false,
    move:false,
    attack: false,
    special:false,
    location:null,
    hermit:"",
    underworld:false
  }

  handleTarget= (person)=>{
    this.setState({
      person:person
    })
  }

  handleName=(name)=>{
    fetch(`${API_ROOT}/api/v1/players`)
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
        fetch(`${API_ROOT}/api/v1/players/${person.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({...person}),
        })
        .then(response => response.json())
        .then(data => {
          // fetch(`${API_ROOT}/api/v1/characters/${data.character.id}`, {
          //   method: 'PATCH',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Accept': 'application/json'
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
    this.setState({
      move:true
    })
    let location = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*4)
    fetch(`${API_ROOT}/api/v1/characters/${player.character.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({...player.character,location:location, damage:null}),
    })
    this.setState({
      location:location
    })
  }
  specialAttack=(player)=>{

    if (player.character.name === "Wight"){
      this.setState({
        special:true
      })
    let playerWithCharacter = this.props.players.filter(player => {return player.name !== "none"})
    let deadPlayer = playerWithCharacter.filter(singlePlayer=>{
      return singlePlayer.character.hp === 0
    }).length
    fetch(`${API_ROOT}/api/v1/games/${player.game.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({...player.game, wight:deadPlayer}),
    })
    }else if (player.character.name === "Vampire") {
      if(!!this.state.person){
        this.setState({
          special:true,
          attack:true
        })
        let target = this.props.players.find(player => player.id === parseInt(this.state.person))
        let damage = Math.abs(Math.ceil(Math.random()*6)-Math.ceil(Math.random()*4))
        fetch(`${API_ROOT}/api/v1/characters/${target.character.id}`, {
          method: 'PATCH',
          headers: HEADERS,
          body: JSON.stringify({...target.character,damage:damage}),
        })
        if (damage !== 0){
          fetch(`${API_ROOT}/api/v1/characters/${player.character.id}`, {
            method: 'PATCH',
            headers: HEADERS,
            body: JSON.stringify({...player.character,damage:-2}),
          })
        }
      }else{
        alert("Please pick target")
      }
    }else if (player.character.name === "Ultra Soul") {
      let thisPlayer = this.props.players.find(player => player.id === this.props.player.id)
      let thesePlayers = this.props.players.filter(player => player.name !== "none")
      let underworldPlayer = thesePlayers.filter(player => {return (parseInt(player.character.location) === 4 || parseInt(player.character.location) === 5)})
      if (!underworldPlayer[0] && underworldPlayer[0] === thisPlayer){
        alert("No one is in underworld")
      }else{
        this.setState({
          ultra: true,
          special:true
        })
      }
    }else if (player.character.name === "Werewolf") {

    }else if (player.character.name === "Valkyrie") {
      let damage = Math.ceil(Math.random()*4)
      fetch(`${API_ROOT}/api/v1/characters/${this.state.player.character.id}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({...player.character,damage:damage}),
      })
    }else if (player.character.name === "Unknown") {
    }else if (player.character.name === "Ellen") {
    }else if (player.character.name === "Fu-ka") {
      if(!!this.state.person){
        this.setState({
          special:true
        })
        let target = this.props.players.find(player => player.id === parseInt(this.state.person))
        fetch(`${API_ROOT}/api/v1/characters/${target.character.id}`, {
          method: 'PATCH',
          headers: HEADERS,
          body: JSON.stringify({...target.character,damage:7}),
        })
      }else{
        alert("Please pick target")
      }
    }else if (player.character.name === "George") {
      if(!!this.state.person){
        this.setState({
          special:true
        })
        let target = this.props.players.find(player => player.id === parseInt(this.state.person))
        let damage = Math.ceil(Math.random()*4)
        fetch(`${API_ROOT}/api/v1/characters/${target.character.id}`, {
          method: 'PATCH',
          headers: HEADERS,
          body: JSON.stringify({...target.character,damage:damage}),
        })
      }else{
        alert("Please pick target")
      }
    }else if (player.character.name === "Gregor") {
    }else if (player.character.name === "Emi") {
      if (player.character.location === null){
        alert("Cannot use on turn 1")
      }else{
        this.setState({
          emi:true,
          special:true
        })
      }
    }else if (player.character.name === "Franklin") {
    }else if (player.character.name === "David") {
    }else if (player.character.name === "Bryan") {
    }else if (player.character.name === "Agnes") {
    }else if (player.character.name === "Charles") {
      if(!!this.state.person){
        this.setState({
          special:true,
          attack:true
        })
        let target = this.props.players.find(player=>player.id === parseInt(this.state.person))
        let damage =Math.abs(Math.ceil(Math.random()*6)-Math.ceil(Math.random()*4))
        fetch(`${API_ROOT}/api/v1/characters/${target.character.id}`, {
          method: 'PATCH',
          headers: HEADERS,
          body: JSON.stringify({...target.character,damage:damage}),
        }).then(r=>r.json())
        .then(data =>{
          damage =Math.abs(Math.ceil(Math.random()*6)-Math.ceil(Math.random()*4))
          fetch(`${API_ROOT}/api/v1/characters/${target.character.id}`, {
            method: 'PATCH',
            headers: HEADERS,
            body: JSON.stringify({...target.character,damage:damage}),
          })
        })
      }else{
        alert("Please pick target")
      }
    }else if (player.character.name === "Daniel") {
    }else if (player.character.name === "Catherine") {
    }else if (player.character.name === "Allie") {
      this.setState({
        special:true
      })
      fetch(`${API_ROOT}/api/v1/characters/${player.character.id}`, {
         method: 'PATCH',
         headers: HEADERS,
         body: JSON.stringify({...player.character,damage:"allie"}),
       })
    }
  }

  attackNumber=(e)=>{
    e.preventDefault()
    let thisPlayer = this.props.players.find(player => player.id === this.props.player.id)
    let player = this.props.players.find(player=>player.id === parseInt(this.state.person))
    let fields = thisPlayer.game.field
    let shortField = thisPlayer.game.field.filter(x => x !== 3 && x !== 5)
    let thisPlayerLocation = thisPlayer.character.location === 3 ? 2 : thisPlayer.character.location === 5?4:thisPlayer.character.location
    let targetLocation = player.character.location === 3 ? 2 : player.character.location === 5?4:player.character.location
    let thisPlayerIndex = shortField.findIndex(x => x === thisPlayerLocation)
    let targetIndes =shortField.findIndex(x => x === targetLocation)
    let possible ;
    if ((thisPlayerIndex ===0 ||thisPlayerIndex ===1)&&(targetIndes===0 || targetIndes=== 1)){
     possible = true
    }else if ((thisPlayerIndex ===2 ||thisPlayerIndex ===3)&&(targetIndes===2 || targetIndes=== 3)) {
     possible = true
    }else if ((thisPlayerIndex ===4 ||thisPlayerIndex ===5)&&(targetIndes===4 || targetIndes=== 5)) {
     possible = true
    }else{
     possible = false
    }

    if(!!this.state.person && possible){
      let damage =Math.abs(Math.ceil(Math.random()*6)-Math.ceil(Math.random()*4))
      fetch(`${API_ROOT}/api/v1/characters/${player.character.id}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({...player.character,damage:damage}),
      })
      if (thisPlayer.character.name === "Vampire" || thisPlayer.character.name === "Charles"){
        this.setState({
          special:true
        })
      }
      this.setState({
        attack:true
      })
    }else{
      alert("Target Not in range")
    }
  }

  endTurn=(player)=> {
    let sort = this.props.players.sort((a,b)=> a.id - b.id)
    let playerAmount= sort.filter(x=>x.name !== "none" && x.character.hp > x.character.damage).length
    let playerAlive= sort.filter(x=>x.name !== "none" && x.character.hp > x.character.damage)
    let postin = playerAlive.findIndex(x => x.id === player.id)
    postin += 1
    let turn;
    if(postin < playerAmount){
     turn=playerAlive[postin]
    }else{
     turn=playerAlive[0]
    }
    fetch(`${API_ROOT}/api/v1/games/${turn.game.id}`, {
      method: 'PATCH',
      headers: HEADERS,
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
    fetch(`${API_ROOT}/api/v1/characters/${player.character.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({...player.character,location:location, damage:null}),
    })
    this.setState({
      emi:false,
      move:true,
      location:parseInt(location)
    })
  }

  ultraSpecial = (playerId) => {
    let target = this.props.players.find(player =>{return player.id === parseInt(playerId)})
    fetch(`${API_ROOT}/api/v1/characters/${target.character.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({...target.character,damage:3}),
    })
    this.setState({
      ultra:false
    })
  }

  moveAnywhere=(location,player)=>{
    fetch(`${API_ROOT}/api/v1/characters/${player.character.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({...player.character,location:location, damage:null}),
    })
    this.setState({
      location:location
    })
  }

  weirdWoods=(action, target)=>{
    let targetPlayer = this.props.players.find(player => player.id === target)
    if(target){
      if(action ==="damage"){
        fetch(`${API_ROOT}/api/v1/characters/${targetPlayer.character.id}`, {
          method: 'PATCH',
          headers: HEADERS,
          body: JSON.stringify({...targetPlayer.character,damage:2}),
        })
      }else{
        fetch(`${API_ROOT}/api/v1/characters/${targetPlayer.character.id}`, {
          method: 'PATCH',
          headers: HEADERS,
          body: JSON.stringify({...targetPlayer.character,damage:-1}),
        })
      }
      this.setState({
        location:null
      })
    }else{
      alert("please pick targer")
    }
  }

  hermitEffectdone=(hermit,target)=>{
    let targetPlayer = this.props.players.find(player => player.id === parseInt(target))
      fetch(`${API_ROOT}/api/v1/characters/${targetPlayer.character.id}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({...targetPlayer.character,hermit:hermit}),
      }).then(r=>r.json())
      .then(data=>{
        this.setState({
          location:"hermitWait"
        })
      })
  }

  resolveHermit=(player)=>{
    let damage = null;
    if (player.character.hermit.split(" ")[4] !== player.character.alliance){
      damage=1
    }
    fetch(`${API_ROOT}/api/v1/characters/${player.character.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({...player.character,damage:damage,hermit:null}),
    })
    if(this.state.underworld)
    this.setState({
      location: null,
      underworld: false
    })
  }

  blessingHeal=(target)=>{
    let player = this.props.players.find(player=> player.id === parseInt(target))
    let damage = -Math.ceil(Math.random()*6)
    fetch(`${API_ROOT}/api/v1/characters/${player.character.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({...player.character,damage:damage}),
    })
    this.setState({
      location:null
    })
  }

  healing=(player, damage)=>{
    fetch(`${API_ROOT}/api/v1/characters/${player.character.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({...player.character,damage:damage}),
    })
    this.setState({
      location:null,
      underworld:false
    })
  }

  greenCard=()=>{
    this.setState({
      location:2,
      underworld: true
    })
  }

  whiteCard=()=>{
    this.setState({
      location:6,
      underworld: true
    })
  }

  blackCard=()=>{
    this.setState({
      location:8,
      underworld: true
    })
  }

  backEffect =(target,thisPlayer, number)=>{
    if(number === 1){
      fetch(`${API_ROOT}/api/v1/characters/${thisPlayer.character.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({...thisPlayer.character,damage:2}),
      }).then(r=>r.json())
      .then(data=>{
        fetch(`${API_ROOT}/api/v1/characters/${target.character.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({...target.character,damage:2}),
        })
      })
    this.setState({
      location:null
    })
    }else if(number === 2){
      fetch(`${API_ROOT}/api/v1/characters/${target.character.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({...target.character,damage:2}),
      }).then(r=>r.json())
      .then(data=>{
        fetch(`${API_ROOT}/api/v1/characters/${thisPlayer.character.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({...thisPlayer.character,damage:-1}),
        })
      })
    }
    this.setState({
      location:null
    })
  }

  locationEffectdone =()=>{
    this.setState({
      location:null,
      underworld: false
    })

  }


  render(){
    let thisPlayer = this.props.players.find(player => player.id === this.props.player.id)
    let allPlayer = this.props.players.filter(player => player.name !== "none")
    let alivePlayer;
    if (allPlayer[0] !== undefined && allPlayer[0].character !== null){
      alivePlayer = allPlayer.filter(player => player.character.hp > player.character.damage)
    }
    if(this.state.location === 2 || this.state.location === 3){
      if(this.state.hermit === ""){
        let hermitCards=["If you are not shadow take 1 damage","If you are not hunter take 1 damage","If you are not neutral take 1 damage"]
        let theHermitCard=hermitCards[Math.floor(Math.random()*hermitCards.length)]
        this.setState({
          hermit:theHermitCard
        })
      }
      let otherAlivePlayer = alivePlayer.filter(player => player.id !== thisPlayer.id)
      return(
        <div className="player-data">
          <span className="locationTitle">Hermit's Cabin</span>
          <br/>
          {this.state.hermit}
          <br/>
            <form onChange={e=>this.handleTarget(e.target.value)}>
              <select>
                <option >--please select a target--</option>
                {
                  otherAlivePlayer.map(player=>{
                    return(
                      <option key={player.id} value={player.id}>{player.name}</option>
                    )
                  })
                }
              </select>
            </form>
            <button type="button" onClick={e => this.hermitEffectdone(this.state.hermit,this.state.person)}>confirm</button><br/>

        </div>
      )
    }else if (this.state.location === 4 || this.state.location === 5) {
      return(
        <div className="player-data">
          <span className="locationTitle">Underworld Gate</span> <br/>
          <button type="button" onClick={this.greenCard}>Green card</button><br/>
          <button type="button" onClick={this.whiteCard}>white card</button><br/>
          <button type="button" onClick={this.blackCard}>Black card</button><br/>
        </div>
      )
    }else if (this.state.location === 6) {
      let whiteCard = [
        {1:"Concealed Knowledge: When this turn. It will be your turn again"},
        {2:"Blessing: You pick a character other than yourself and that chracter heals 1-6."},
        {3: "First Aid: Place a character's HP marker to 7."},
        {4: "Holy water of healing: Heal 2 points of your damage." }
      ]
      let thisWhiteCard = whiteCard[Math.floor(Math.random()*whiteCard.length)]
      if (Object.keys(thisWhiteCard)[0] === "1"){
        fetch(`${API_ROOT}/api/v1/games/${thisPlayer.game.id}`, {
          method: 'PATCH',
          headers: HEADERS,
          body: JSON.stringify({...thisPlayer.game, wight:1}),
        })
        return(
          <div className="player-data">
            <span className="locationTitle">Church</span><br/>
          {Object.values(thisWhiteCard)}
            <button type="button" onClick={this.locationEffectdone}>ok</button><br/>
          </div>
        )
      }else if (Object.keys(thisWhiteCard)[0] === "2") {
        return(
          <div className="player-data">
            <span className="locationTitle">Church</span><br/>
          {Object.values(thisWhiteCard)}
          <br/>
          {
            alivePlayer.map(player=>{
              return(
                <Fragment key={player.id}>
                  <button  type="button" onClick={e=>this.blessingHeal(player.id)}>{player.name}</button><br/>
                </Fragment>
              )
            })
          }
          </div>
        )
      }else if (Object.keys(thisWhiteCard)[0] === "3") {
        return(
          <div className="player-data">
            <span className="locationTitle">Church</span><br/>
          {Object.values(thisWhiteCard)}
          <br/>
            {
              alivePlayer.map(player=>{
                return(
                  <Fragment key={player.id}>
                    <button type="button" onClick={e=>this.healing(player,7)}>{player.name}</button><br/>
                  </Fragment>
                )
              })
            }
          </div>
        )
      }else if (Object.keys(thisWhiteCard)[0] === "4") {
        return(
          <div className="player-data">
            <span className="locationTitle">Church</span><br/>
          {Object.values(thisWhiteCard)}
            <button type="button" onClick={e=>this.healing(thisPlayer, -2)}>ok</button><br/>
          </div>
        )
      }

    }else if (this.state.location === 7) {
      const locationToName ={2:"Hermit's Cabin", 3:"Hermit's Cabin", 4:"Underworld Gate", 5:"Underworld Gate", 6:"Church", 8:"Cemetery", 9:"Werid woods", 10:"Erstwhile Altar"}
      return(
        <div className="player-data">
          <span className="locationTitle">Choose where to go</span>
          <br/><button type="button" onClick={e=>this.moveAnywhere(parseInt(e.target.value),thisPlayer)} value = "2" >Hermit's Cabin</button><br/>
          <button type="button" onClick={e=>this.moveAnywhere(parseInt(e.target.value),thisPlayer)} value = "4" >Underworld Gate</button><br/>
          <button type="button" onClick={e=>this.moveAnywhere(parseInt(e.target.value),thisPlayer)} value = "6" >Church</button><br/>
          <button type="button" onClick={e=>this.moveAnywhere(parseInt(e.target.value),thisPlayer)} value = "8" >Cemetery</button><br/>
          <button type="button" onClick={e=>this.moveAnywhere(parseInt(e.target.value),thisPlayer)} value = "9" >Werid woods</button><br/>
          <button type="button" onClick={e=>this.moveAnywhere(parseInt(e.target.value),thisPlayer)} value = "10" >Erstwhile Altar</button><br/>
        </div>
      )
    }else if (this.state.location === 8) {
      let number = Math.ceil(Math.random()*2)
      let theBlackCard = ["Bloodthristy Spider:You give 2 points of damage to any character and receive 2 points of damage yoursef","Vampire Bat:You give 2 points of damage to any chatacter and heal 1 point of your own damage"]
      let otherPlayer= allPlayer.filter(player => player.id !== thisPlayer.id)
      return(
        <div className="player-data">
          <span className="locationTitle">Cemetery</span> <br/>
          {theBlackCard[number-1]}
          {
            alivePlayer.map(player=>{
              return(
                <Fragment key={player.id}>
                  <br/><button type="button" onClick={e=>this.backEffect(player,thisPlayer,number)}>{player.name}</button><br/>
                </Fragment>
              )
            })
          }
        </div>
      )
    }else if (this.state.location === 9) {
      return(
        <div className="player-data">
          <span className="locationTitle">Werid woods</span><br/>
          do 2 damage to any player or heal 1 for any player
          <form onChange={e=>this.handleTarget(e.target.value)}>
            <select>
              <option >--please select a target--</option>
              {
                alivePlayer.map(player=>{
                  return(
                    <option key={player.id} value={player.id}>{player.name}</option>
                  )
                })
              }
            </select>
          </form>
          <button type="button" onClick={e=>this.weirdWoods(e.target.value,parseInt(this.state.person))} value="heal" >heal</button><br/>
          <button type="button" onClick={e=>this.weirdWoods(e.target.value,parseInt(this.state.person))} value="damage" >damage</button><br/>
        </div>
      )
    }else if (this.state.location === 10) {
      return(
        <div className="player-data">
          <span className="locationTitle">Erstwhile Altar</span><br/>
          <button type="button" onClick={this.locationEffectdone}></button><br/>
        </div>
      )
    }else if (this.state.location === "hermitWait") {
        if (allPlayer.find(player => !!player.character.hermit) === undefined){
          this.setState({
            location: null,
            hermit:""
          })
        }
        return(
          <div className ="outer-color player-data" style={{backgroundColor:thisPlayer.color}}>
            <div className="player-data">
              <span className="title">Player name:</span>{thisPlayer.name}<br/>
              <span className="title">color:</span>{thisPlayer.color}<br/>
              <span className="title">character Name:</span>{thisPlayer.character.name}<br/>
              <span className="title">Alliance:</span>{thisPlayer.character.alliance}<br/>
              <span className="title">HP:</span>{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
              <span className="title">Win condition:</span>{thisPlayer.character.win_condition}<br/>
              <span className="title">Ability:</span>{thisPlayer.character.ability}<br/>
            </div>
          </div>
        )

    }
    if(thisPlayer !== undefined){
      if(thisPlayer.character !== null && !!thisPlayer.character.hermit){
        return(
          <div className="player-data">
            {thisPlayer.character.hermit}
            <button type="button" onClick={e=>this.resolveHermit(thisPlayer)}>Ok</button><br/>
          </div>
        )
      }
    }

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
      return(
        <div className="outer-color" style={{backgroundColor:thisPlayer.color}}>
        <div className="player-data">
          <span className="title">Player name:</span>{thisPlayer.name}<br/>
          <span className="title">color:</span>{thisPlayer.color}<br/>
          <span className="title">character Name:</span>{thisPlayer.character.name}<br/>
          <span className="title">Alliance:</span>{thisPlayer.character.alliance}<br/>
          <span className="title">HP:</span>{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
          <span className="title">Win condition:</span>{thisPlayer.character.win_condition}<br/>
          <span className="title">Ability:</span>{thisPlayer.character.ability}<br/>
        <button type="button" onClick={e=>{this.moveNumber(thisPlayer)}} >Move</button><br/>
        {(thisPlayer.character.name === "Emi")?<button type="button" onClick={e=>this.specialAttack(thisPlayer)} >Special</button>:null}
        </div>
      </div>
      )
    }else if(!!this.props.player.id && this.props.turn.id === this.props.player.id && this.state.attack === false && this.state.special === false){
      let otherPlayer = allPlayer.filter(player => player.id !== thisPlayer.id && player.character.hp > player.character.damage)
      return(
        <div className ="outer-color" style={{backgroundColor:thisPlayer.color}}>
      <div className="player-data">
        <span className="title">Player name:</span>{thisPlayer.name}<br/>
        <span className="title">color:</span>{thisPlayer.color}<br/>
        <span className="title">character Name:</span>{thisPlayer.character.name}<br/>
        <span className="title">Alliance:</span>{thisPlayer.character.alliance}<br/>
        <span className="title">HP:</span>{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
        <span className="title">Win condition:</span>{thisPlayer.character.win_condition}<br/>
        <span className="title">Ability:</span>{thisPlayer.character.ability}<br/>
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
              <br/><input type="submit" value="attack"></input>
            </form>
          {(thisPlayer.character.name !== "Emi")?<button type="button" onClick={e=>this.specialAttack(thisPlayer)} >Special</button>:null}
          <button type="button" onClick={e => this.endTurn(thisPlayer)}>End turn</button><br/>
      </div>
    </div>
      )
    }else if(!!this.props.player.id && this.props.turn.id === this.props.player.id && this.state.attack === true && this.state.special === false){
      let otherPlayer = allPlayer.filter(player => player.id !== thisPlayer.id)
      return(
        <div className ="outer-color" style={{backgroundColor:thisPlayer.color}}>
      <div className="player-data">
        <span className="title">Player name:</span>{thisPlayer.name}<br/>
        <span className="title">color:</span>{thisPlayer.color}<br/>
        <span className="title">character Name:</span>{thisPlayer.character.name}<br/>
        <span className="title">Alliance:</span>{thisPlayer.character.alliance}<br/>
        <span className="title">HP:</span>{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
        <span className="title">Win condition:</span>{thisPlayer.character.win_condition}<br/>
        <span className="title">Ability:</span>{thisPlayer.character.ability}<br/>
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
          <button type="button" onClick={e => this.endTurn(thisPlayer)}>End turn</button><br/>
      </div>
    </div>
      )
    }else if(!!this.props.player.id && this.props.turn.id === this.props.player.id && this.state.attack === false && this.state.special === true){
      let otherPlayer = allPlayer.filter(player => player.id !== thisPlayer.id)
      return(
        <div className ="outer-color" style={{backgroundColor:thisPlayer.color}}>
      <div className="player-data">
        <span className="title">Player name:</span>{thisPlayer.name}<br/>
        <span className="title">color:</span>{thisPlayer.color}<br/>
        <span className="title">character Name:</span>{thisPlayer.character.name}<br/>
        <span className="title">Alliance:</span>{thisPlayer.character.alliance}<br/>
        <span className="title">HP:</span>{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
        <span className="title">Win condition:</span>{thisPlayer.character.win_condition}<br/>
        <span className="title">Ability:</span>{thisPlayer.character.ability}<br/>
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
          <button type="button" onClick={e => this.endTurn(thisPlayer)}>End turn</button><br/>
      </div>
    </div>
      )
    }else if(!!this.props.player.id && this.props.turn.id === this.props.player.id && this.state.attack === true && this.state.special === true){
      let otherPlayer = allPlayer.filter(player => player.id !== thisPlayer.id)
      return(
        <div className ="outer-color" style={{backgroundColor:thisPlayer.color}}>
      <div className="player-data">
        <span className="title">Player name:</span>{thisPlayer.name}<br/>
        <span className="title">color:</span>{thisPlayer.color}<br/>
        <span className="title">character Name:</span>{thisPlayer.character.name}<br/>
        <span className="title">Alliance:</span>{thisPlayer.character.alliance}<br/>
        <span className="title">HP:</span>{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
        <span className="title">Win condition:</span>{thisPlayer.character.win_condition}<br/>
        <span className="title">Ability:</span>{thisPlayer.character.ability}<br/>
      <button type="button" onClick={e => this.endTurn(thisPlayer)}>End turn</button><br/>
      </div>
    </div>
      )
    } else if (!!this.props.player.id && thisPlayer.character) {
      return(
        <div className ="outer-color" style={{backgroundColor:thisPlayer.color}}>
        <div className="player-data">
          <span className="title">Player name:</span>{thisPlayer.name}<br/>
          <span className="title">color:</span>{thisPlayer.color}<br/>
          <span className="title">character Name:</span>{thisPlayer.character.name}<br/>
          <span className="title">Alliance:</span>{thisPlayer.character.alliance}<br/>
          <span className="title">HP:</span>{thisPlayer.character.hp - thisPlayer.character.damage}<br/>
          <span className="title">Win condition:</span>{thisPlayer.character.win_condition}<br/>
          <span className="title">Ability:</span>{thisPlayer.character.ability}<br/>
        </div>
      </div>
      )
    }else{
      return(
        <div className="sign">
          <form onSubmit={(e)=>{
              e.preventDefault();
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
    field: state.field,
    hermit: state.hermit
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
