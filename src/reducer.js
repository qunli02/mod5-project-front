const defaultState = {
  game:false,
  players:[{name:"none", game:{id:1},character:{name:""}},{name:"none", game:{id:1},character:{name:""}},{name:"none", game:{id:1},character:{name:""}},{name:"none", game:{id:1},character:{name:""}},{name:"none", game:{id:1},character:{name:""}},{name:"none", game:{id:1},character:{name:""}},{name:"none", game:{id:1},character:{name:""}},{name:"none", game:{id:1},character:{name:""}}],
  room:null,
  player: {id: null, name:"none", game:{id:1}},
  turn:{id: null},
  damage: 0
  }

function reducer(prevState = defaultState, action){
  switch(action.type){
    case "PLAYERS":
      return {...prevState, players: action.data, room: action.data[0].game.id}
    case "SELECTEDPLAYER":
      return {...prevState, player: action.data}
    case "SELECTEDTURN":
      return {...prevState, turn: action.data}
    case "CABLE":
      let postion = prevState.players.findIndex(x => x.id === action.data.player.id)
      let newSta = {...prevState}
      newSta.players.splice(postion,1,action.data.player)
      return {...prevState,players:[...newSta.players]}
    case "TURN":
      return {...prevState, turn:action.data.player}
    case "UPDATECHARACTER":
      let characterPostion = prevState.players.findIndex(x => x.id === action.data.character.player_id)
      let newCharacterState = {...prevState}
      let characterPlayer = newCharacterState.players[characterPostion]
      characterPlayer.character = action.data.character
      newCharacterState.players.splice(characterPostion,1,characterPlayer)
      return {...prevState, players: [...newCharacterState.players]}
    default:
      return prevState
  }

}

export default reducer
