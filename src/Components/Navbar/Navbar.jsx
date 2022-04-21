import {Link, NavLink} from "react-router-dom";
import {Navigate, useNavigate} from "react-router-dom";
// import GameListItem from "../GamesList/GameListItem";
import ConfigSession from "../views/ConfigSession";
// import {sessionDeleteAction} from '../../store/actions/sessionActions'

const Navbar = () => {
    const router = useNavigate();
    // function removeSession() {
    //     dispatch(sessionDeleteAction())
    // }
    const onNewGameButton = () => {
        router("/configsession");
    };

    return (
        <nav className="navbar mt-3 mb-5 bg-warning rounded">
            <h1 className="px-3"> 🥷🏿 Humans Vs. Zombies 🧟‍♂️ </h1>
            <div className="links p-2">
                <Link to="/Login">Login | </Link>
                <Link to="/Register">Register | </Link>
                <Link to="/profile">Profile</Link>
                {/* <NavLink onClick={removeSession} to="/">Log-Out</NavLink> */}
                <button className="btn btn-danger m-2 p-2" onClick={onNewGameButton}>
                    New Game
                </button>
            </div>
        </nav>
    );
};

export default Navbar;


