import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const GameListItem = ({ game }) => {

  const navigate = useNavigate();

  const joinGame = (gameId) => {
    // POST: /api/game/{gameId}/player
    navigate(`/game/${gameId}/player`);
  }

  const displayGameDetails = (gameId) => {
    navigate(`/game/${gameId}`);
  }

  return (
    <tr>
      <td>{game.name}</td>
      <td>{game.gameState}</td>
      <td>{game.players.length}</td>
      <td>
        <button className="btn btn-info m-1" onClick = {() => joinGame(game.id)}>Join</button>
        <button className="btn btn-info m-1" onClick = {() => displayGameDetails(game.id)}>Details</button>
      </td>
    </tr>
  )
}

export default GameListItem