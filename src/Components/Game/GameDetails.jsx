import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getGameById, updateGame} from '../../services/rest-api/gameService';

const GameDetails = (props) => {

    const [title, setTitle] = useState("");
    const [gameState, setGameState] = useState("");
    let gameId = props.game.id;

    const navigate = useNavigate();

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

    const gameUpdateForm = (e) => {
        e.preventDefault();
        setTitle(props.game.name);
        setGameState(props.game.state);
    };


    const saveGameUpdate = async (event) => {
        event.preventDefault();
        // PUT: api/game/{id}

         const gameChanges = {title, gameState};
         console.log(title);
         console.log(gameState);
        // await updateGame(props.game.id, gameChanges);
        navigate(`/game/${props.game.id}`);
    };

    const deleteGame = () => {

    };

    const startGame = async() => {
      let game = await getGameById(gameId);
      let gamePlayers = setZombies(game.players);

      console.log(gamePlayers);
    };

    function setZombies(players, probability = 10) {
        let hasZombie = false;

        players.forEach(p => {
            if (p.isZombie) {
                hasZombie = true;
            }
        });

        if (!hasZombie) {
            players.forEach((p, index) => p.isZombie = index % probability === 0);
        }

        return players;
    }

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
                    isUserAdmin &&
                    <div>
                        <button className="btn btn-secondary m-1" onClick={gameUpdateForm}>Edit</button>
                        <button className="btn btn-success m-1" onClick={startGame}>Start Game</button>
                        <button className="btn btn-success m-1">Delete Game</button>
                    </div>
                }
            </span>
            </div>
            {
                title &&
                    <div  className='container mt-2'>
                        <h3>Game update</h3>
                        <form>
                            <div className="form-grout mb-2">
                                <label className="form-label">Game title:</label>
                                <input
                                    type="text"
                                    name="title" className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="form-grout mb-2">
                                <label className="form-label">Game state:</label>
                                <input
                                    type="text"
                                    name="game-state" className="form-control"
                                    value={gameState}
                                    onChange={(e) => setGameState(e.target.value)}
                                />
                            </div>

                            <button className="btn btn-secondary m-1" onClick={(e) => saveGameUpdate(e)}>Save</button>
                        </form>
                    </div>
            }
        </div>
    );
};

export default GameDetails;