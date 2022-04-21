import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {get} from "../../services/rest-api/apiFetchServiceWrapper";
// import Select from 'react-select'

const Profile = () => {
    const router = useNavigate();


    let userdata = JSON.parse(localStorage.getItem('<USER>'));

    // debugger
    // let firstnameRef = useRef();
    // let lastnameRef = useRef();
    // let emailRef = useRef();
    // let usernameRef = useRef();

    // firstnameRef.current.value = userdata.firstname

    const registerSubmit = (e) => {
        e.preventDefault();
        // getRefs();

        // if (!firstnameValue ||
        //     !lastnameValue ||
        //     !emailValue ||
        //     !usernameValue ||
        //     !passwordValue ||
        //     !passwordReValue) {
        //     alert("fill all fields");
        //     return;
        // }

        // if (passwordValue.length < 3) {
        //     alert("the password should have more than 3 characters");
        //     return;
        // }
        //
        // if (passwordValue !== passwordReValue) {
        //     alert("passwords don't match");
        //     return;
        // }
        //
        // console.log('all fields are filled');
    };

    // function getRefs() {
    //     firstnameValue = firstnameRef.current.value;
    //     lastnameValue = lastnameRef.current.value;
    //     emailValue = emailRef.current.value;
    //     usernameValue = usernameRef.current.value;
    //     passwordValue = passwordRef.current.value;
    //     passwordReValue = passwordReRef.current.value;
    // }

    return (
        <div>
            <h2>Profile Information</h2>
            <table>
                <tr>
                    <td>First Name</td>
                    <td>{userdata.firstname}</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>{userdata.lastname}</td>
                </tr>
                <tr>
                    <td>E-Mail</td>
                    <td>{userdata.email}</td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td >{userdata.username}</td>
                </tr>

            </table>

        </div>
    );
};

export default Profile;