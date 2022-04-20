import React from 'react';

const GameDetails = (props) => {

    let userData = JSON.parse(localStorage.getItem('<USER>'));
    let isUserAdmin = false;

    if (userData) {
        isUserAdmin = userData.isAdmin;
    }

    const renderPlayers = () => {
        if (props.game.players) {
            return props.game.players.map(player =>
                <div key={player.id}>
                    <p>Player: {player.id}</p>
                    <p>Username: {player.username}</p>
                    <p>Player type: {player.isHuman ? 'human' : 'zombie'}</p>
                    <hr/>
                </div>
            );
        }
    };

    return (
        <div>
            <h2>{props.game.name}</h2>
            <p>Game state: {props.game.state}</p>
            <br/>
            <div>{renderPlayers()}</div>
            <br/>
            <div>
            <span>
                {
                    isUserAdmin && <button className="btn btn-info">Edit</button>
                }
            </span>
            </div>
        </div>
    );
};

export default GameDetails;