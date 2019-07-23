const defaultState = {
  game:false,
  players:[{name:"none", game:{id:1}},{name:"none"},{name:"none"},{name:"none"},{name:"none"},{name:"none"},{name:"none"},{name:"none"}],
  room:null,
  player: {name:"nsdasd"}
  }

function reducer(prevState = defaultState, action){
  switch(action.type){
    case "PLAYERS":
      return {...prevState, players: action.data, room: action.data[0].game.id}
    case "SELECTEDPLAYER":
      return {...prevState, player: action.data}
    case "PLAYERNAME":
      prevState.players.splice((action.data.number),1,{...prevState.players[(action.data.number)], name: action.data.name})
      return{...prevState,players:[...prevState.players]}
    default:
      return prevState
  }

}

export default reducer
