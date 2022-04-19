import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {getAdminAccessToken, login, refreshUserAccessToken, registerNewUser} from "./services/keycloak/authService";
import {useContext} from "react";
import {UserContext} from "./store/UserContext";
import {createGame, deleteGame, getAllGames, getGameById, updateGame} from "./services/rest-api/gameService";
import {createUser, getAllUsers, updateUser} from "./services/rest-api/userService";
import {GAME_STATE_TYPES} from "./services/rest-api/gameStateTypes";
import {createPlayer} from "./services/rest-api/playerService";

import Navbar from "./Components/Navbar/Navbar"
import NotFoundView from './Components/views/NotFoundView'
import LoginView from  './Components/views/LoginView'
import ConfigSession from './Components/views/ConfigSession';
import PlayerView from './Components/views/PlayerView'
import RegisterView from './Components/views/RegisterView'
import GameListView from './Components/views/GameListView'



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

    async function register() {
        await registerNewUser("kiro", "kirov", "kiro30@mail.de", "kiro", "123321");
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
        let game = await createGame(`testGameFromReact`);

        console.log(game);
    }

    async function getGames() {
        let games = await getAllGames();
        console.log(games);
    }

    async function createUserInRestApi() {
        const userData = await createUser();
        console.log(userData);
    }

    async function testUpdateUser() {
        let data = await updateUser(5, {
            "firstname": "testuserUpdated",
            "lastname": "testuserUpdated",
            "username": "testuserUpdated"
        });

        console.log(data);
    }

    async function testGetAllUser() {
        let data = await getAllUsers();
        console.log(data);
    }

    async function testUpdateGame(){
        let data = await updateGame(1,{gameState: GAME_STATE_TYPES.in_progress});
        console.log(data);
    }

    async function getGameByIdTest(){
        const data = await getGameById(1);
        console.log(data);
    }

    async function deleteGameTest(){
       console.log( await deleteGame(1));
    }

    async function registerPlayerForGameTest(){
        const data = await createPlayer(1,{
            "human": true,
            "zombie": false
        });

        console.log(data)
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>

                <Routes>
                    <Route path="/" element={<GameListView/>}/>
                    <Route path="/login" element={<LoginView/>}/>

                    <Route path="/configsession" element={<ConfigSession/>}/>

                    <Route path="/game/:id" element={<GameView/>}/>

                    <Route path="/game/:id/player" element={<PlayerView/>}/>
                    <Route path="/register" element={<RegisterView/>}/>
                    <Route path="*" element={<NotFoundView/>}/>
                </Routes>
                <br/><br/><br/><br/><br/><hr/>

                <button onClick={loginFeat}> login</button>
                <button onClick={getAdminAccessToken}> token</button>
                <button onClick={register}>register</button>
                <button onClick={refreshToken}>refresh token</button>
                <button onClick={printUserData}> print user data</button>

                <hr/>
                <button onClick={createGameTest}>create game</button>
                <hr/>
                <button onClick={getGames}>get all games</button>
                <hr/>
                <button onClick={createUserInRestApi}>Create User In RestApi</button>
                <hr/>
                <button onClick={testUpdateUser}>testUpdateUser</button>
                <hr/>
                <button onClick={testGetAllUser}>test Get All User</button>
                <hr/>
                <button onClick={testUpdateGame}>testUpdateGame</button>
                <hr/>
                <button onClick={getGameByIdTest}>getGameByIdTest</button>
                <hr/>
                <button onClick={registerPlayerForGameTest}>registerPlayerForGameTest</button>
                <hr/>
                <button onClick={deleteGameTest}>deleteGameTest</button>
            </BrowserRouter>
        </div>
    );
}

export default App;
