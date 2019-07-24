const defaultState = {
  game:false,
  players:[{name:"none", game:{id:1}},{name:"none"},{name:"none"},{name:"none"},{name:"none"},{name:"none"},{name:"none"},{name:"none"}],
  room:null,
  player: null,
  turn:null
  }

function reducer(prevState = defaultState, action){
  switch(action.type){
    case "PLAYERS":
      return {...prevState, players: action.data, room: action.data[0].game.id}
    case "SELECTEDPLAYER":
      return {...prevState, player: action.data}
    case "SELECTEDTURN":
      return {...prevState, turn: action.data}
    case "PLAYERNAME":
      let newStat = {...prevState}
      newStat.players.splice((action.data.number),1,{...prevState.players[(action.data.number)], name: action.data.name})
      return{...prevState,players:[...newStat.players]}
    case "PLAYER":
      let postion = prevState.players.findIndex(x => x.id === action.data.player.id)
      let newSta = {...prevState}
      newSta.players.splice(postion,1,action.data.player)
      return {...prevState,players:[...newSta.players]}
    default:
      return prevState
  }

}

export default reducer
