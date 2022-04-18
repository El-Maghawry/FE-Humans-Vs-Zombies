import React from 'react'

const GamesList = ({ game }) => {

  const joinGame = (gameId) => {
    // Backend request
    // Should be: create Player in the Game
  }

  return (
    <tr>
      <td>{game.name}</td>
      <td>{game.gameState}</td>
      <td>{game.players.length} players</td>
      <td>
        <button className="btn btn-info m-1" to={`/game/${game.id}`} onClick = {() => joinGame(game.id)}>Join</button>

        {/* // simplify it taking the button out */}
        {/* <button className="btn btn-info m-1" to={`/game/${game.id}`} onClick = {() => displayGameDetails(game.id)}>Details</button> */}
      </td>
    </tr>
  )
}

export default GamesList