import React, {useState, useEffect} from 'react';
import GameDetails from '../Game/GameDetails';
import {useParams} from 'react-router-dom';
import {getGameById} from "../../services/rest-api/gameService";

const SessionDetailsView = async() => {

    const {id} = useParams();

    // const [game, setGame] = useState({});

    // const getGameById = () => {
    //   setGame({
    //     id: id,
    //     name: "Game 2",
    //     gameState: "IN PROGRESS",
    //     players: [
    //       {id: "159"}, {id: "753"}, {id: "951"}, {id: "357"}
    //     ]
    //   });
    // }

    // useEffect(() => {
    //   // GET: /api/game/{gameId}
    //   getGameById();
    // }, [game])
    let game = await getGameById(2);
    console.log(game);
    return (
        <div className="container">
            <h2>game view</h2>
            <GameDetails game={game}/>
        </div>
    );
};

export default SessionDetailsView;