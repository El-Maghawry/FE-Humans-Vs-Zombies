import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const GameListItem = (props) => {
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
      <td>{props.game.name}</td>
      <td>{props.game.gameState}</td>
      <td>{props.game.players.length}</td>
      <td>
        <button className="btn btn-info m-1" onClick = {() => joinGame(props.game.gameId)}>Join</button>
        <button className="btn btn-info m-1" onClick = {() => displayGameDetails(props.game.gameId)}>Details</button>
      </td>
    </tr>
  )
}

export default GameListItem