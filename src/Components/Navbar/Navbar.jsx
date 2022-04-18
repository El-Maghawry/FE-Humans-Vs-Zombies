import { Link, NavLink } from 'react-router-dom'
// import {sessionDeleteAction} from '../../store/actions/sessionActions'

const Navbar = () => {

    // function removeSession() {
    //     dispatch(sessionDeleteAction())
    // }

    return (
        <nav className="navbar mt-3 mb-5 bg-warning rounded">
            <h1 className='px-5'> 🥷🏿 Humans Vs. Zombies 🧟‍♂️ </h1>
            <div className="links p-3">
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
                {/* <NavLink onClick={removeSession} to="/">Log-Out</NavLink> */}
                <button className="btn btn-danger m-2 p-2">New Game</button>
            </div>


        </nav>
    );
}

export default Navbar;