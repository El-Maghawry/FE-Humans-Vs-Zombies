import React from 'react';

const GameDetails = (props) => {
/*
{
    "gameId": 2,
    "name": "testGameFromReact",
    "gameState": "REGISTRATION",
    "players": [
        {
            "id": 4,
            "userId": 1,
            "gameId": 2,
            "isHuman": true,
            "isZombie": false,
            "biteCode": "[99, 56, 50, 54, 100, 49, 48, 102, 45, 99, 98, 50, 56, 45, 52, 54, 98, 53, 45, 97, 54, 56, 53, 45, 54, 55, 102, 54, 48, 53, 49, 99, 99, 97, 98, 48]"
        },
        {
            "id": 5,
            "userId": 2,
            "gameId": 2,
            "isHuman": true,
            "isZombie": false,
            "biteCode": "[54, 101, 57, 99, 50, 101, 54, 50, 45, 57, 55, 98, 55, 45, 52, 49, 55, 50, 45, 57, 101, 55, 49, 45, 98, 52, 100, 97, 53, 101, 48, 102, 53, 101, 50, 55]"
        },
        {
            "id": 6,
            "userId": 5,
            "gameId": 2,
            "isHuman": true,
            "isZombie": false,
            "biteCode": "[49, 50, 98, 101, 54, 50, 102, 52, 45, 48, 51, 48, 100, 45, 52, 100, 50, 56, 45, 97, 54, 99, 50, 45, 56, 52, 102, 55, 56, 97, 97, 57, 102, 51, 57, 48]"
        }
    ]
}
 */
    const renderPlayers = () => {
        console.log(props.game);
         return props.game.players.map(player =>
             (
                 <div key={player.id}>
                     <p>Player: {player.id}</p>
                     <p>Username: {player.username}</p>
                     <p>Player type: {player.isHuman ? 'human': 'zombie'}</p>
                 </div>
             )
         );
    };

    return (
        <div>
            <h2>{props.game.name}</h2>
            <p>Game state: {props.game.gameState}</p>
            <br/>
            <div>{renderPlayers()}</div>
            <br/>
            <div>
        <span>
          <button className="btn btn-info">Edit</button>
        </span>
            </div>
        </div>
    );
};

export default GameDetails;