import React, { useState, useEffect } from "react";
import GamesList from "../../Components/GamesList/GamesList";

const GameListView = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames();
  }, []);

  const getAllGames = () => {
    // Backend request
    return setGames([
      {
        id: "123456789",
        name: "Game 1",
        gameState: "IN PROGRESS",
        players: [],
      },
      {
        id: "987412365",
        name: "Game 2",
        gameState: "PROGRESS",
        players: [],
      },
      {
        id: "369258147",
        name: "Game 3",
        gameState: "REGISTRATION",
        players: [],
      },
    ]);
  };

  return (
    <div className="container">

      <table className="table table-bordered table-striped">
        <thead>
          <th>All Games</th>
          <th>
            {/* <NavLink to="/add-employee" className="btn btn-info mb-2">
              Add Employee
            </NavLink> */}
          </th>
        </thead>
        <tbody>
          {
            games.map((game) => (<GamesList game={game} key={game.id}/>))
          }
        </tbody>
      </table>
    </div>
  );
};

export default GameListView;
