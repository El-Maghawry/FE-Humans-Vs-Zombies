import React from 'react'
import { NavLink } from 'react-router-dom'

const GamesList = ({ game }) => {

  const joinGame = (gameId) => {
    // Backend request: it creates Player in the Game
  }

  const displayGameDetails = (gameId) => {
    console.log(gameId);
  }

  return (
    <tr>
      <td>{game.name}</td>
      <td>{game.gameState}</td>
      <td>{game.players.length}</td>
      <td>
        <button className="btn btn-info m-1" to={`/game/${game.id}`} onClick = {() => joinGame(game.id)}>Join</button>

        <NavLink className="btn btn-info m-1" to={`/game/${game.id}`} onClick = {() => displayGameDetails(game.id)}>Details</NavLink>
      </td>
    </tr>
  )
}

export default GamesList