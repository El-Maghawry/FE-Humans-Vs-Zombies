import React, {useState, useEffect} from 'react';
import GameDetails from '../Game/GameDetails';
import {useParams} from 'react-router-dom';
import {getGameById} from "../../services/rest-api/gameService";

const SessionDetailsView = () => {

    const {id} = useParams();
    const [game, setGame] = useState({});

    async function fetchData() {
        let game = await getGameById(id);
        setGame(game);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <GameDetails game={game}/>
        </div>
    );
};

export default SessionDetailsView;