import React from 'react';
import './App.css';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import NewGame from './newGame';
import Login from './login';
import Board from './board';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { connect } from "react-redux";

class App extends React.Component {

  state={
    game:false,
  }

  handleGame=()=>{
    fetch('http://localhost:4000/api/v1/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({}),
    })
    .then(r=>r.json())
    .then(data=> {
      this.setState({
        game:true
      })
      this.props.handleplayers(data)
    })
  }

  render(){
    return(
      <div>
        <ActionCableConsumer
          channel={{ channel: 'PlayersChannel', game: this.props.players[0].game.id}}
          onReceived={event =>{
            if (event.player.amiaplayer === "player") {
              this.props.handleCableInfo(event)
            }else if (event.player.amiaplayer === "turn") {
              this.props.handleTurn(event)
            }else if (event.player.amiaplayer === "characterUpdate") {
              this.props.handleCharacter(event)
            }
          }}
          />
        <Switch>
          <Route exact path="/" render={()=><NewGame state={this.state} handleGame={this.handleGame}/>} />
          <Route exact path="/player" render={()=><Login/>} />
          <Route exact path="/board" render={()=><Board/>} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    players: state.players,
    room: state.room
  }
}

function mapDispatchToProps(dispatch){
  return{
    handleplayers: (players) => {
      dispatch({type: "PLAYERS", data: players})
    },
    handleCableInfo: (player)=>{
      dispatch({type: "CABLE", data: player})
    },
    handleTurn: (player)=>{
      dispatch({type:"TURN", data:player})
    },
    handleCharacter: (character)=>{
      dispatch({type:"UPDATECHARACTER", data:character})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
