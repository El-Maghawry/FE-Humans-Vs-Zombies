import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createGame} from "../services/rest-api/gameService";

const ConfigSession = () => {
    const router = useNavigate();
    let descRef = useRef();
    let titleRef = useRef();

    const sessionSubmit = async (e) => {
        e.preventDefault();
        let title = titleRef.current.value;
        let description = descRef.current.value;

       const gameRes = await createGame(title, description);
       router('/');
    };
    return (
        <div>
            <form>
                <div className="form-grout mb-2">
                    <label className="form-label">Titel Game</label>

                    <input
                        type="text"
                        placeholder="Enter title of the game"
                        name="title"
                        className="form-control"
                        ref={titleRef}
                    />
                    <br/>
                    <textarea
                        placeholder="Enter description of the game"
                        name="description"
                        className="form-control"
                        ref={descRef}
                    />
                </div>

                <button
                    className="btn btn-danger border-warning m-1"
                    onClick={(e) => sessionSubmit(e)}
                >
                    Create Game
                </button>
            </form>
        </div>
    );
};

export default ConfigSession;
