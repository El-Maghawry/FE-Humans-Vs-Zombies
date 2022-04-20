import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const GameListItem = (props) => {
    let userData = JSON.parse(localStorage.getItem('<USER>'));

  const navigate = useNavigate();

  const joinGame = (gameId) => {
    // POST: /api/game/{gameId}/player
    navigate(`/game/${gameId}/player`);
  }

  const displayGameDetails = (gameId) => {
    navigate(`/game/${gameId}`);
  }

  console.log(props.game)
  return (
    <tr>
      <td>{props.game.name}</td>
      <td>{props.game.state}</td>
      <td>{props.game.players.length}</td>
        {
            userData ?
                <td>
                    <button className="btn btn-info m-1" onClick = {() => joinGame(props.game.id)}>Join</button>
                    <button className="btn btn-info m-1" onClick = {() => displayGameDetails(props.game.id)}>Details</button>
                </td>
                : ''
        }

    </tr>
  )
}

export default GameListItem