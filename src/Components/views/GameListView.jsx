import React, {useState, useEffect} from "react";
import GameListItem from "../Game/GameListItem";
import {getAllGames} from "../../services/rest-api/gameService";

const GameListView = () => {
    const [games, setGames] = useState([]);

    async function fetchData() {
        let gamesData = await getAllGames();
        setGames(gamesData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Games</th>
                    <th>State</th>
                    <th>Players</th>
                </tr>
                </thead>
                <tbody>
                {
                    games.map(game => <GameListItem game={game} fetchData={fetchData} key={game.gameId}/>)
                }
                </tbody>
            </table>
        </div>
    );
};

export default GameListView;
