import React from 'react'

import { connect } from "react-redux"

class damage extends React.Component {

  render(){
    return(
      <table>
        <tbody>
        <tr>
          <th>Damage</th>
        </tr>
        <tr>
          <td>0</td>
          <td>8</td>
        </tr>
        <tr>
          <td>1</td>
          <td>9</td>
        </tr>
        <tr>
          <td>2</td>
          <td>10</td>
        </tr>
        <tr>
          <td>3</td>
          <td>11</td>
        </tr>
        <tr>
          <td>4</td>
          <td>12</td>
        </tr>
        <tr>
          <td>5</td>
          <td>13</td>
        </tr>
        <tr>
          <td>6</td>
          <td>14</td>
        </tr>
        <tr>
          <td>7</td>
          <td>15</td>
        </tr>
        <tr>
          <td>8</td>
          <td>16</td>
        </tr>
        </tbody>
        </table>
    )
  }
}

function msp(state){
  return{
    players: state.players,
    turn: state.turn
  }
}

function mdp(dispatch){
  return{
  }
}


export default connect(msp,mdp)(damage);

// <div>
//   <div style={{backgroundImage: `url(https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)`}}>
//     ssdadsd3434<br/>
//   asdasd
// </div>
// <div>
//   1
// </div>
// </div>
