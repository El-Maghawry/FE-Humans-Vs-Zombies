import {useNavigate} from "react-router-dom";
import {getUserByUsername} from "../../services/rest-api/userService";
import {Component} from "react";

class Profile extends Component {
    username = JSON.parse(localStorage.getItem('<USER>')).username;

    constructor(props) {
        super(props);
        this.state = {userdata: {}};
    }

    async componentDidMount() {
        this.userdata = await getUserByUsername(this.username);
        this.gamedata = await getUserByUsername(this.username);
        this.forceUpdate();
    }

    render() {
        return (<>
            <details>
                <summary>User</summary>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {/*<th scope="col">#</th>*/}
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">User ID</th>
                        <th scope="col">User Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {/*<th scope="row">1</th>*/}
                        <td>{this.userdata?.firstname}</td>
                        <td>{this.userdata?.lastname}</td>
                        <td>{this.userdata?.username}</td>
                        <td>{this.userdata?.userId}</td>
                        <td>{this.userdata?.admin ? "Admin" : "Player"}</td>
                    </tr>
                    </tbody>
                </table>
            </details>

            {this.userdata?.player !== null && (<>
                <details>
                    <summary>Player</summary>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Player ID</th>
                            <th scope="col">Human or Zombie?</th>
                            <th scope="col">Bite Code</th>
                            <th scope="col">Kills</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.userdata?.playerId}</td>
                            <td>{this.userdata?.playerId === null ? "" :
                                    this.userdata?.human === true ? "Human" :
                                        "Zombie"}
                            </td>
                            <td>{this.userdata?.biteCode}</td>
                            <td>{this.userdata?.kills?.length}</td>
                        </tr>
                        </tbody>
                    </table>
                </details>

                <details>
                    <summary>Game</summary>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Game Name</th>
                            <th scope="col">Game ID</th>
                            <th scope="col">Game State</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.userdata?.gameName}</td>
                            <td>{this.userdata?.gameId}</td>
                            <td>{this.userdata?.gameState}</td>
                        </tr>
                        </tbody>
                    </table>
                </details>
            </>)}
        </>);
    }
}

export default Profile;
