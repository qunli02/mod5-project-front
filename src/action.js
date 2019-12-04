import React from 'react'
import { connect } from "react-redux"

class action extends React.Component {

  moveNumber=(e)=>{

    let location = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*4)
    if (location === 7){
    }
    e.target.disabled = true
    e.target.parentElement.children[4].disabled = false
    e.target.parentElement.children[6].disabled = false
    e.target.parentElement.children[8].disabled = false
  }

  attackNumber=(e)=>{
    e.target.disabled = true
  }


  render(){
    // TODO; you need to update PLAYER reducer case because this.props.player is null right now.
    // <h1>{this.props.player.name} turn</h1><br/>
    return(
      <div>
        <button type="button" onClick={this.moveNumber} >Move</button><br/>
        <button type="button" disabled onClick={this.attackNumber}>Attack</button><br/>
        <button type="button" disabled >Special</button><br/>
        <button type="button" disabled >End trun</button><br/>
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

export default connect(msp)(action);
