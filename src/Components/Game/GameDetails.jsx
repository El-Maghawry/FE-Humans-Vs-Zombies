import React, {useState} from 'react';

const GameDetails = (props) => {

    // const editGame = () => {
    // // PUT: /api/game/{gameId}
    //   let updatedGame = {...game};
    //   console.log(updatedGame);
    // }

    const renderPlayers = () => {
        return props.game.players.map(player =>
            (
                <div key={player.id}>
                    <p>Player: {player.userId}</p>
                    <p>Player: {player.isHuman}</p>
                    <p>Player: {player.isZombie}</p>
                </div>
            )
        );
    };

    return (
        <div>
            <h2>{}</h2>
            <p>Game state: {}</p>
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