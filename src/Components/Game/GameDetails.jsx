import React, { useEffect, useState } from 'react'

const GameDetails = ({ gameId }) => {

  const [game, setGame] = useState({});

  const getGameById = () => {
    setGame({
      id: 65487987,
      name: "Game 2",
      gameState: "IN PROGRESS",
      players: [
        {id: "159"}, {id: "753"}, {id: "951"}, {id: "357"}
      ],
    });
  }

  useEffect(() => {
    // GET: /api/game/{gameId}
    getGameById();
  }, [])

  const editGame = () => {

    let updatedGame = {...game};
    console.log(updatedGame);
  } 
  
  return (
    <div>
      <h2>{game.name}</h2>
      <p>Game state: {game.gameState}</p>
      <br/>
      <div>
        {
          game.players.map(player => <p>Player: {player.id}</p>)
        }
      </div>
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