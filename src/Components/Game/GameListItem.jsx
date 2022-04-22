import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {getGameById} from "../../services/rest-api/gameService";
import {createPlayer} from "../../services/rest-api/playerService";

const GameListItem = (props) => {
    let userData = JSON.parse(localStorage.getItem('<USER>'));

    const navigate = useNavigate();

    const joinGame = async (gameId) => {
        let game = await getGameById(gameId);

        if (game.state !== 'REGISTRATION') {
            return;
        }

        let playerType;
        playerType = getRandomPlayerType();

        const playerData = await createPlayer(gameId, {
            human: playerType === 'human',
            zombie: playerType === 'zombie'
        });

        props.fetchData();
    };

    function getRandomPlayerType(probability = 0.2) {
        return Math.random() > probability ? "human" : "zombie";
    }

    const displayGameDetails = (gameId) => {
        navigate(`/game/${gameId}`);
    };

    console.log(props.game);
    return (
        <tr>
            <td>{props.game.name}</td>
            <td>{props.game.state}</td>
            <td>{props.game.players.length}</td>
            {
                userData &&
                    <td>
                        {
                            props.game.state === "REGISTRATION" &&
                                <button className="btn btn-success m-1" onClick={() => joinGame(props.game.id)}>Join</button>
                        }
                        <button className="btn btn-secondary m-1" onClick={() => displayGameDetails(props.game.id)}>Details
                        </button>
                    </td>
            }

        </tr>
    );
};

export default GameListItem;