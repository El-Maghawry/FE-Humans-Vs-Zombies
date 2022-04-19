import React, { useEffect, useState } from 'react'

const GameDetails = ({ gameId }) => {

  const [game, setGame] = useState({});

  const getGameById = () => {
    setGame({
      id: gameId,
      name: "Game 2",
      gameState: "IN PROGRESS",
      players: [
        {id: "159"}, {id: "753"}, {id: "951"}, {id: "357"}
      ]
    });
  }

  useEffect(() => {
    // GET: /api/game/{gameId}
    getGameById();
  }, [])

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