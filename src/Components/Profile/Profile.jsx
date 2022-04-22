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
        console.log("state.userdata: " + this.userdata)
        console.table(this.userdata)
        this.forceUpdate()
    }

    render() {
        return (
            <>
                <h2>User</h2>
                <table class="table table-striped">
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
                        <td>{this.userdata?.firstName}</td>
                        <td>{this.userdata?.lastName}</td>
                        <td>{this.userdata?.username}</td>
                        <td>{this.userdata?.id}</td>
                        <td>{this.userdata?.isAdmin ? "Admin" : "Player"}</td>
                    </tr>
                    </tbody>
                </table>
                {
                    this.userdata?.player !== null &&
                    (
                        <>
                    <h2>Player</h2>
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
                        <td>{this.userdata?.player?.id}</td>
                        <td>{this.userdata?.player?.isHuman ? "Human" : "Zombie"}</td>
                        <td>{this.userdata?.player?.biteCode}</td>
                        <td>{this.userdata?.player?.kills}</td>
                    </tr>
                    </tbody>
                </table>
                        </>
                    )
                }
            </>
        )
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