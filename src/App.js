import React from 'react';
import './App.css';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import NewGame from './newGame';
import Login from './login';
import Board from './board';
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
      <Switch>
      <Route exact path="/" render={()=><NewGame state={this.state} handleGame={this.handleGame}/>} />
      <Route exact path="/player" render={()=><Login/>} />
      <Route exact path="/board" render={()=><Board/>} />
    </Switch>
    )
  }
}

function mapStateToProps(state){
  return{state}
}

function mapDispatchToProps(dispatch){
  return{
    handleplayers: (players) => {
      dispatch({type: "PLAYERS", data: players})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
