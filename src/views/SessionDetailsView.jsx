import React, {useState, useEffect} from 'react';
import GameDetails from '../Components/Game/GameDetails';
import {useParams} from 'react-router-dom';
import {getGameById} from "../services/rest-api/gameService";
import {getAllKillsInGame} from "../services/rest-api/killService";

const SessionDetailsView = () => {

    const {id} = useParams();
    const [game, setGame] = useState({});
    const [kills, setKills] = useState([]);

    async function fetchData() {
        let game = await getGameById(id);
        setGame(game);
    }

    async function fetchKills(){
        const kills = await getAllKillsInGame(id);
        setKills(kills);
    }

    useEffect(() => {
       Promise.all([fetchData(),fetchKills()]);
    },[]);

    return (
        <div className="container" key={id}>
            <GameDetails key={id} game={game} fetchGame={fetchData} fetchKills={fetchKills} kills={kills}/>
        </div>
    );
};

export default SessionDetailsView;