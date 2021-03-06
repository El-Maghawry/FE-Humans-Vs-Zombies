import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {deleteGame, getGameById, updateGame} from '../../services/rest-api/gameService';
import {updatePlayerInGame} from "../../services/rest-api/playerService";
import {GAME_STATE_TYPES} from "../../services/rest-api/gameStateTypes";
import Map from "../Map/Map";
import {createKillInGame, getAllKillsInGame} from "../../services/rest-api/killService";
import ChatRoom from "../ChatRoom/ChatRoom";
import Collapsable from "../Collapsable/Collapsable";
import {toast} from "react-toastify";

const GameDetails = (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [gameState, setGameState] = useState("");
    const [biteCode, setBiteCode] = useState("");
    const [killerId, setKillerId] = useState("");
    const [kills, setKills] = useState([]);
    const [showKillForm, setShowKillForm] = useState(false);
    const [players, setPlayers] = useState([]);

    let gameId = props.game.id;

    const navigate = useNavigate();

    let userData = JSON.parse(localStorage.getItem('<USER>'));
    let isUserAdmin = false;

    if (userData) {
        isUserAdmin = userData.isAdmin;
    }


    useEffect(() => {
        setPlayers(renderPlayers());

        function renderPlayers() {
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
        }
    },[props.game.players]);

    useEffect(() => {
        setKills(showKills());

        function showKills (){
            if (props.kills) {
                return (
                    props.kills.map(kill =>
                        <div key={kill.id}>
                            <p>Killer: {kill.killerUsername}????????????? </p>
                            <p>ToD: {new Date(kill.timeOfDeath).toLocaleString('de-DE')}</p>
                            <p>victim: {kill.victimUsername}????</p>
                            <hr/>
                        </div>
                    )
                );
            }
        }
    }, [props.kills])

    const gameUpdateForm = (e) => {
        e.preventDefault();
        setTitle(props.game.name);
        setGameState(props.game.state);
        setDescription(props.game.description);
    };


    const saveGameUpdate = async (event) => {
        event.preventDefault();

        const gameChanges = {
            name: title,
            description: description,
            gameState: gameState
        };

        await updateGame(props.game.id, gameChanges);
        props.fetchGame();
        toast.success('Game was updated');
        setTitle("");
    };

    const delGame = async () => {
        let confirm = window.confirm('Are you sure to delete a game');
        if (confirm) {
            await deleteGame(gameId);
            toast.success('Game was deleted');
            navigate(`/`);
        }
    };

    const startGame = async () => {
        let game = await getGameById(gameId);
        let gamePlayers = await setZombies(game.players);
        await updateGame(gameId, {gameState: GAME_STATE_TYPES.in_progress});

        props.fetchGame();
        toast.success('Game was started');
    };

    async function setZombies(players, probability = 10) {
        let hasZombie = false;

        players.forEach(p => {
            if (p.isZombie) {
                hasZombie = true;
            }
        });

        if (!hasZombie) {
            players.forEach((p, index) => p.isZombie = index % probability === 0);
            await updatePlayers(players);
        }

        return players;
    }

    async function updatePlayers(players) {
        for (const player of players) {
            if (player.isZombie) {
                await updatePlayerInGame(gameId, player.id, {
                    human: false,
                    zombie: player.isZombie
                });
            }
        }
    }

    const killForm = () => {
        setShowKillForm(true);
    };

    const createKill = async (e) => {
        e.preventDefault();

        let killData = await createKillInGame(gameId, {
                victimBiteCode: biteCode,
                killer_id: killerId
            }
        );

        setShowKillForm(false);
         props.fetchKills();
        toast.success('Kill was created');
    };



    return (
        <>
            <div className="game-details container">
                <h2>{props.game.name}</h2>

                <div className="header-game-details d-flex flex-row justify-content-between m-2">
                    <div className="col-4 d-flex flex-column align-items-start">
                        <h5>Game state:</h5>
                        <p>{props.game.state}</p>
                        <h6>Description:</h6>
                        <p>{props.game.description}</p>
                        <a className="btn btn-secondary" href="https://qubeshub.org/community/groups/hvz/File:/uploads/UnityCollegeHvZRulesandRegulations.pdf">Game Rules</a>
                    </div>

                    <div className={"col-3"}>
                        <Collapsable label="View Players">
                             <div>{players}</div>
                        </Collapsable>
                    </div>

                    <div className={"col-5"}>
                        <Collapsable label="View Kills">
                            <div>{kills}</div>
                        </Collapsable>
                    </div>
                </div>

                <br/>

                <div>
            <span>
                {
                    isUserAdmin &&
                    <div className="mb-3">
                        <button className="btn btn-secondary m-1" onClick={gameUpdateForm}>Edit</button>
                        <button className="btn btn-success m-1" onClick={startGame}>Start Game</button>
                        <button className="btn btn-outline-danger m-1" onClick={killForm}>Kill</button>
                        <button className="btn btn-danger m-1" onClick={delGame}>Delete Game</button>
                    </div>
                }
            </span>
                </div>
                {
                    title &&
                    <div className="container mt-2">
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

                            <div>
                                <textarea
                                    placeholder="Enter description of the game"
                                    name="description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="form-grout mb-2">
                                <div>
                                    <div>
                                        <input type="radio" id="reg" name="state" value="REGISTRATION"
                                               checked={gameState === 'REGISTRATION'}
                                               onChange={(e) => setGameState(e.target.value)}
                                        />
                                        <label htmlFor="reg">Registration</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="prog" name="state" value="IN_PROGRESS"
                                               checked={gameState === 'IN_PROGRESS'}
                                               onChange={(e) => setGameState(e.target.value)}
                                        />
                                        <label htmlFor="prog">In Progress</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="com" name="state" value="COMPLETE"
                                               checked={gameState === 'COMPLETE'}
                                               onChange={(e) => setGameState(e.target.value)}/>
                                        <label htmlFor="com">Complete</label>
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-secondary m-1" onClick={(e) => saveGameUpdate(e)}>Save</button>
                        </form>
                    </div>
                }

                <div>
                    {
                        showKillForm &&
                        <div className="container mt-2">
                            <h3>Kill update</h3>
                            <form>
                                <div className="form-grout mb-2">
                                    <label className="form-label">Victim's Bite code:</label>
                                    <input
                                        type="text"
                                        name="bitecode" className="form-control"
                                        value={biteCode}
                                        onChange={(e) => setBiteCode(e.target.value)}
                                    />
                                </div>

                                <div className="form-grout mb-2">
                                    <label className="form-label">Killer ID:</label>
                                    <input
                                        type="number"
                                        name="killerId" className="form-control"
                                        value={killerId}
                                        onChange={(e) => setKillerId(e.target.value)}
                                    />
                                </div>

                                <button className="btn btn-secondary m-1" onClick={(e) => createKill(e)}>Save</button>
                            </form>
                        </div>
                    }
                </div>

                <div className="map-chat d-flex flex-row p-1 justify-content-around align-items-center">
                    {/*this should go in its own component*/}
                    <div className="map-box p-6 border-1 m-1">
                        <Map username={userData.username} players={props.game.players}/>
                    </div>
                    {/*this should go in its own component*/}
                    <div>
                        <ChatRoom username={userData.username}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GameDetails;