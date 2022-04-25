import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerNewUser} from "../services/keycloak/authService";
import {toast} from "react-toastify";

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


    const registerSubmit = async (e) => {
        e.preventDefault();
        getRefs();

        let hasError = false;

        if (!firstnameValue ||
            !lastnameValue ||
            !emailValue ||
            !usernameValue ||
            !passwordValue ||
            !passwordReValue) {
            toast.error("fill all fields");
            return;
        }

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(emailValue)) {
            toast.error("Please enter a valid email");
            hasError = true;
        }

        if (passwordValue.length < 3) {
            toast.error("the password should have more than 3 characters");
            hasError = true;
        }

        if (passwordValue !== passwordReValue) {
            toast.error("passwords don't match");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const data = await registerNewUser(firstnameValue, lastnameValue, emailValue, usernameValue, passwordValue);


        if (!data) {
            toast.error('User already exists');
            return;
        }

        toast.success('Registration Successful');
        router("/");

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