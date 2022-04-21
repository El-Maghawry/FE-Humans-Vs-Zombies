import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {logout} from "../../services/keycloak/authService";

const Navbar = () => {
    const router = useNavigate();
    const userData = JSON.parse(localStorage.getItem('<USER>'));

    const onNewGameButton = () => {
        router("/configsession");
    };

    function signOut() {
        logout();
        router('/');
    }

    return (
        <>
            <nav className="navbar mt-3 mb-5 bg-warning rounded">
                <h1 className="px-3"> 🥷🏿 Humans Vs. Zombies 🧟‍♂️ </h1>
                {
                    userData ?
                        <div className="links p-2">
                            <h6 className=" btn btn-light mx-4 mt-2 text-capitalize"><Link to="/profile">Welcome {userData.username}👤</Link></h6>
                            <Link className="btn btn-dark m-2 p-2" to="/">Home</Link>
                            <button className="btn links btn-dark m-2 p-2" onClick={signOut}>
                                Logout
                            </button>
                            {
                                userData.isAdmin
                                    ?
                                    <button className="btn btn-dark m-2 p-2" onClick={onNewGameButton}>
                                        New Game
                                    </button>
                                    : <Link className="btn btn-dark m-2 p-2" to="/">Home</Link>
                            }
                        </div>
                        :
                        <div className="links p-2">
                            <Link className="btn btn-dark m-2 p-2" to="/">Home</Link>
                            <Link className="btn btn-dark m-2 p-2" to="/login">Login</Link>
                            <Link className="btn btn-dark m-2 p-2" to="/register">Register</Link>
                        </div>
                }
            </nav>

        </>
    );
};

export default Navbar;


