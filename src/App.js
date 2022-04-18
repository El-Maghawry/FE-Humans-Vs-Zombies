import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {getAdminAccessToken, login, refreshUserAccessToken, registerNewUser} from "./services/keycloak/authService"
import {useContext} from "react";
import {UserContext} from "./store/UserContext"
import {createGame, getAllGames} from "./services/rest-api/gameService"

import Navbar from "./Components/Navbar/Navbar"
import NotFoundView from './Components/views/NotFoundView'
import LoginView from  './Components/views/LoginView'
import RegisterView from './Components/views/RegisterView'
import GamesListView from './Components/views/GamesListView'


function App() {
    const [user, setUser] = useContext(UserContext);
    let userData;

    async function loginFeat() {
        userData = await login('petar', "123321");
        setUser({
            username: 'petar',
            access_token: userData.access_token,
            refresh_token: userData.refresh_token
        });
    }
    
    async function register(){
        await registerNewUser("testuser100", "testln100", "testmail30@mail.de", "testuser100", "password")
    }

    async function refreshToken() {
        let refreshedUserData = await refreshUserAccessToken(user.refresh_token);
        let username = user.username;

        setUser({
            username: username,
            access_token: refreshedUserData.access_token,
            refresh_token: refreshedUserData.refresh_token
        });

        console.log(refreshedUserData);
    }

    function printUserData() {
        console.log(user);
    }

    async function createGameTest() {
        let game = await createGame( `testGameFromReact`);

        console.log(game);
    }

    async function getGames() {
        let games = await getAllGames();
        console.log(games);
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
            
                <Routes>
                    <Route path="/" element={<GamesListView/>}/>
                    <Route path="/login" element={<LoginView/>}/>
                    <Route path="/register" element={<RegisterView/>}/>
                    <Route path="*" element={<NotFoundView/>}/>
                </Routes>
                <br/><br/><br/><br/><br/>

                <button onClick={loginFeat}> login</button>
                <button onClick={getAdminAccessToken}> token</button>
                <button onClick={register}>register</button>
                <button onClick={refreshToken}>refresh token</button>
                <button onClick={printUserData}> print user data</button>

                <hr/>
                <button onClick={createGameTest}>create game</button>
                <hr/>
                <button onClick={getGames}>get all games</button>
            </BrowserRouter>
        </div>
    );
}

export default App;
