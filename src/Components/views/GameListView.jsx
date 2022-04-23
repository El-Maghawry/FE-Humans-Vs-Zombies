import React, {useState, useEffect} from "react";
import GameListItem from "../Game/GameListItem";
import {getAllGames} from "../../services/rest-api/gameService";

const GameListView = () => {
    const [games, setGames] = useState([]);
    let userData = JSON.parse(localStorage.getItem('<USER>'));

    async function fetchData() {
        let gamesData = await getAllGames();
        setGames(gamesData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (userData) {
        games.forEach(game => {
            game.players.forEach(player => {
                if (player.username === userData.username) {
                    localStorage.removeItem('<USER>');
                    userData.joinedGame = player.gameId;
                    localStorage.setItem('<USER>', JSON.stringify(userData));
                }
            });
        });
    }

    return (
        <div className="container">
            {
                games ?
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
                    :
                    <div className="loader"/>
            }
        </div>
    );
};

export default GameListView;
