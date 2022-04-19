import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfigSession = () => {
  const router = useNavigate();

  const [title, setTitle] = useState("");


  const sessionSubmit = (e) => {
    e.preventDefault();

    router("/"); // some logic needs to happen here before user can go back to main screen
  };
  return (
    // Each newly started session should be on status Registration.
    // Should get an automatic Id
    // Player automatically to 0
    // What other information needs to be considered
    // The game needs to contain the new session after clicking on Submit
    // some logic needs to happen here before user can go back to main screen

    <div>
      <form>
        <div className="form-grout mb-2">
          <label className="form-label">Titel Game</label>
          <input
            type="text"
            placeholder="Enter title of the game"
            name="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button
          className="btn btn-danger border-warning m-1"
          onClick={(e) => sessionSubmit(e)}
        >
          Initate Session
        </button>
      </form>
    </div>
  );
};

export default ConfigSession;
