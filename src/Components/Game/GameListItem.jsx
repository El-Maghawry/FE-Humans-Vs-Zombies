import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {getGameById} from "../../services/rest-api/gameService";
import {createPlayer} from "../../services/rest-api/playerService";
import {toast} from "react-toastify";

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

        let coords = JSON.parse(localStorage.getItem('<COORDS>'));

        if(!coords){
            coords = {
                lng:"0",
                lat:"0",
            }
        }

        const playerData = await createPlayer(gameId, {
            lng:`${coords.lng.toString()}`,
            lat:`${coords.lat.toString()}`,
            human: playerType === 'human',
            zombie: playerType === 'zombie'
        });

        props.fetchData();
        toast.success('You joined for a game with name ' + props.game.name);
    };

    function getRandomPlayerType(probability = 0.2) {
        return Math.random() > probability ? "human" : "zombie";
    }

    const displayGameDetails = (gameId) => {
        navigate(`/game/${gameId}`);
    };

    /**
     * @param {array} players
     */
    function checkIfPlayerIsPresent(players) {
        let isFound = false;
        players.forEach(e => {
            if (e.username === userData.username) {
                isFound = true;
                localStorage.removeItem('<USER>');
                userData.joinedGame = e.gameId;
                localStorage.setItem('<USER>', JSON.stringify(userData));
            }
        });

        return isFound;
    }

    return (
        <tr className="tab-row">
            <td>{props.game.name}</td>
            <td>{props.game.state}</td>
            <td>{props.game.players.length}</td>
            {
                userData &&
                <td>
                    {
                        props.game.state === "REGISTRATION" && !checkIfPlayerIsPresent(props.game.players)
                            ?
                            !userData.joinedGame
                                ?
                                <button className="btn btn-success m-1"
                                        onClick={() => joinGame(props.game.id)}>Join</button>
                                :
                                userData.joinedGame === props.game.id ?
                                    < button disabled className="btn btn-success m-1">Joined</button>
                                    : ''
                            :
                            checkIfPlayerIsPresent(props.game.players)
                                ?
                                < button disabled className="btn btn-success m-1">Joined</button>
                                :
                                ''
                    }
                    <button className="btn btn-secondary m-1" onClick={() => displayGameDetails(props.game.id)}>Details
                    </button>
                </td>
            }

        </tr>
    );
};

export default GameListItem;