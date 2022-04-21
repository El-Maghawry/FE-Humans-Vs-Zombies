
import {useNavigate} from "react-router-dom";

import {getUserByUsername} from "../../services/rest-api/userService";
import {Component} from "react";



class Profile extends  Component {
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
            <div className="container">
                <h2>Profile Information</h2>
                <table>
                    <tr>
                        <td>First Name</td>
                        <td>{this.userdata?.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{this.userdata?.lastName}</td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td>{this.userdata?.username}</td>
                    </tr>
                    <tr>
                        <td>ID</td>
                        <td>{this.userdata?.id}</td>
                    </tr>
                    <tr>
                        <td>User Type</td>
                        <td>{this.userdata?.isAdmin ? "Admin" : "Player"}</td>
                    </tr>
                </table>
            </div>
        )
    }
};
export default Profile;