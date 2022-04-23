import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import AppContainer from './Components/hoc/AppContainer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import UserProvider from "./store/UserContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <UserProvider>
            <AppContainer>
                <App>
                    <div className="loader"/>
                </App>
            </AppContainer>
        </UserProvider>
    </BrowserRouter>
);
