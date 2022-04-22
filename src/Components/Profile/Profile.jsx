import {useNavigate} from "react-router-dom";
import {getUserByUsername} from "../../services/rest-api/userService";
import {Component} from "react";

class Profile extends Component {
    username = JSON.parse(localStorage.getItem('<USER>')).username;

    // router = useNavigate();
    constructor(props) {
        super(props);
        this.state = {userdata: {}};
        // this.userdata = getUserByUsername(this.username)
    }

    async componentDidMount() {
        this.userdata = await getUserByUsername(this.username)
        this.gamedata = await getUserByUsername(this.username)
        console.log("state.userdata: " + this.userdata)
        console.table(this.userdata)
        this.forceUpdate()
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
            {/*<h2>User</h2>*/}

            {this.userdata?.player !== null && (<>
                <details><summary>Player</summary>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {/*<th scope="col">#</th>*/}
                            <th scope="col">Player ID</th>
                            <th scope="col">Human or Zombie?</th>
                            <th scope="col">Bite Code</th>
                            <th scope="col">Kills</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {/*<th scope="row">1</th>*/}
                            <td>{this.userdata?.playerId}</td>
                            <td>{this.userdata?.human ? "Human" : "Zombie"}</td>
                            <td>{this.userdata?.biteCode}</td>
                            <td>{this.userdata?.kills}</td>
                        </tr>
                        </tbody>
                    </table>
                </details>
                {/*<h2>Player</h2>*/}

                <details><summary>Game</summary>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {/*<th scope="col">#</th>*/}
                            <th scope="col">Game Name</th>
                            <th scope="col">Game ID</th>
                            <th scope="col">Game State</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {/*<th scope="row">1</th>*/}
                            <td>{this.userdata?.gameName}</td>
                            <td>{this.userdata?.gameId}</td>
                            <td>{this.userdata?.gameState}</td>
                        </tr>
                        </tbody>
                    </table>
                </details>

                {/*<h2>Game</h2>*/}



            </>)}
        </>)
        // return (
        //     <div className="container">
        //         <h2>Profile Information</h2>
        //         <table className="table">
        //             <tr>
        //                 <td>First Name</td>
        //                 <td>{this.userdata?.firstName}</td>
        //             </tr>
        //             <tr>
        //                 <td>Last Name</td>
        //                 <td>{this.userdata?.lastName}</td>
        //             </tr>
        //             <tr>
        //                 <td>Username</td>
        //                 <td>{this.userdata?.username}</td>
        //             </tr>
        //             <tr>
        //                 <td>ID</td>
        //                 <td>{this.userdata?.id}</td>
        //             </tr>
        //             <tr>
        //                 <td>User Type</td>
        //                 <td>{this.userdata?.isAdmin ? "Admin" : "Player"}</td>
        //             </tr>
        //         </table>
        //     </div>
        // )
    }
};
export default Profile;