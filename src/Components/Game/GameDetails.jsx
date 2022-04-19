import React, { useState } from 'react'

const GameDetails = ({ game }) => {

  const editGame = () => {
  // PUT: /api/game/{gameId}
    let updatedGame = {...game};
    console.log(updatedGame);
  } 

  const renderPlayers = () => {

    return game.players.map(player => 
      (
        <div key={player.id}>
          <p>Player: {player.id}</p>
        </div>
      )   
    );
  }
  
  return (
    <div>
      <h2>{game.name}</h2>
      <p>Game state: {game.gameState}</p>
      <br/>
      <div>{ renderPlayers() }</div>
      <br/>
      <div>
        <span>
          <button className='btn btn-info' onClick={editGame}>Edit</button>
        </span>
      </div>
    </div>
  )
}

export default GameDetails