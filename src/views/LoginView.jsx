import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from "../services/keycloak/authService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginView = () => {
    const router = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function loginSubmit(e) {
        e.preventDefault();
        const data = await login(username, password);

        if (data) {
            toast.success('Login successful');
            router('/');
        } else {
            toast.error('username or password don\'t match');
        }
    }

    return (
        <div>
            <form>
                <div className="form-grout mb-2">
                    <label className="form-label">Username</label>
                    <input
                        type="text" placeholder="Enter username"
                        name="username" className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-grout mb-2">
                    <label className="form-label">Password</label>
                    <input
                        type="password" placeholder="Enter your password"
                        name="password" className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-success m-1" onClick={(e) => loginSubmit(e)}>Submit</button>
            </form>
        </div>
    );
};

export default LoginView;