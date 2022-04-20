import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {get} from "../../services/rest-api/apiFetchServiceWrapper";
// import Select from 'react-select'

const RegisterView = () => {
    const router = useNavigate();

    let firstnameValue = '';
    let firstnameRef = useRef();
    let lastnameValue = '';
    let lastnameRef = useRef();
    let emailValue = '';
    let emailRef = useRef();
    let usernameValue = '';
    let usernameRef = useRef();
    let passwordValue = '';
    let passwordRef = useRef();
    let passwordReValue = '';
    let passwordReRef = useRef();

    const registerSubmit = (e) => {
        e.preventDefault();
        getRefs();

        if (!firstnameValue ||
            !lastnameValue ||
            !emailValue ||
            !usernameValue ||
            !passwordValue ||
            !passwordReValue) {
            alert("fill all fields");
            return;
        }

        if (passwordValue.length < 3) {
            alert("the password should have more than 3 characters");
            return;
        }

        if (passwordValue !== passwordReValue) {
            alert("passwords don't match");
            return;
        }

        console.log('all fields are filled');
    };

    function getRefs() {
        firstnameValue = firstnameRef.current.value;
        lastnameValue = lastnameRef.current.value;
        emailValue = emailRef.current.value;
        usernameValue = usernameRef.current.value;
        passwordValue = passwordRef.current.value;
        passwordReValue = passwordReRef.current.value;
    }

    return (
        <div>
            <h2>Registration: Create an Account</h2>
            <br/>
            <form>

                <div className="form-grout mb-2">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        placeholder="E.g. John"
                        name="username"
                        className="form-control"

                        ref={firstnameRef}

                    />
                </div>

                <div className="form-grout mb-2">
                    <label className="form-label">Surname</label>
                    <input
                        type="text"
                        placeholder="E.g. Doe"
                        name="surname"
                        className="form-control"
                        ref={lastnameRef}
                    />
                </div>

                <div className="form-grout mb-2">
                    <label className="form-label">E-mail</label>
                    <input
                        type="text"
                        placeholder="john.doe@zombie-terminator.org"
                        name="email"
                        className="form-control"
                        ref={emailRef}
                    />
                </div>

                <div className="form-grout mb-2">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        placeholder="jzombie-killa"
                        name="username"
                        className="form-control"
                        ref={usernameRef}
                    />
                </div>

                <div className="form-grout mb-2">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        placeholder="Enter a password"
                        name="password"
                        className="form-control"
                        ref={passwordRef}
                    />
                </div>

                <div className="form-grout mb-2">
                    <label className="form-label">Repeat Password</label>
                    <input
                        type="password"
                        placeholder="Repeat password"
                        name="repeatPassword"
                        className="form-control"
                        ref={passwordReRef}
                    />
                </div>
                <button
                    className="btn btn-success m-1"
                    onClick={(e) => registerSubmit(e)}
                >
                    Create Account
                </button>

            </form>
        </div>
    );
};

export default RegisterView;