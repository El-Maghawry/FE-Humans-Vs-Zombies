import './App.css';

import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,

} from 'react-router-dom';

import {getAdminAccessToken, login, refreshUserAccessToken, registerNewUser} from "./services/keycloak/authService";
import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "./store/UserContext";
import {createGame, deleteGame, getAllGames, getGameById, updateGame} from "./services/rest-api/gameService";
import {createUserInApi, getAllUsers, getUserByUsername, updateUser} from "./services/rest-api/userService";
import {GAME_STATE_TYPES} from "./services/rest-api/gameStateTypes";

import Navbar from "./Components/Navbar/Navbar";
import NotFoundView from './views/NotFoundView';
import LoginView from './views/LoginView';
import PlayerView from './views/PlayerView';
import RegisterView from './views/RegisterView';
import GameListView from './views/GameListView';
import {
    createPlayer,
    getAllPlayersInGame,
    getPlayerInGame,
    updatePlayerInGame
} from "./services/rest-api/playerService";
import {
    createKillInGame,
    deleteKillInGame,
    getAllKillsInGame,
    getKillInGame
} from "./services/rest-api/killService";
import ConfigSession from "./views/ConfigSession";
import SessionDetailsView from "./views/SessionDetailsView";
import Profile from "./Components/Profile/Profile";
import Collapsible from "./Components/Collapsable/Collapsable";
import {RequireAuth} from "./guards/auth";
import {ToastContainer} from "react-toastify";

window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((e) => {
            localStorage.setItem('<COORDS>', JSON.stringify({
                lat: e.coords.latitude, lng: e.coords.longitude
            }));
        });
    }
};

function App() {
    const [user, setUser] = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});
    let userData;
    let isUserAdmin = useRef(false);


    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem('<USER>')));
        userInfo
            ?
            userInfo.isAdmin
                ? isUserAdmin.current = true
                : isUserAdmin.current = false
            : isUserAdmin.current = false;

    }, [userInfo, isUserAdmin]);


    async function loginFeat() {
        userData = await login('petar', "123321");
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
        let game = await createGame(`second testGameFromReact`, 'second test game desc ');

        console.log(game);
    }

    async function getGames() {
        let games = await getAllGames();
        console.log(games);
    }

    async function createUserInRestApi() {
        const userData = await createUserInApi();
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

    async function testUpdateGame() {
        let data = await updateGame(5, {gameState: GAME_STATE_TYPES.in_progress});
        console.log(data);
    }

    async function getGameByIdTest() {
        const data = await getGameById(2);
        console.log(data);
    }

    async function deleteGameTest() {
        console.log(await deleteGame(2));
    }

    async function registerPlayerForGameTest() {
        const data = await createPlayer(2, {
            "human": true,
            "zombie": false
        });

        console.log(data);
    }

    async function getPlayersInGame() {
        const data = await getAllPlayersInGame(4);
        console.log(data);
    }

    async function getPlayer() {
        const data = await getPlayerInGame(3, 5);
        console.log(data);
    }

    async function updatePlayerTest() {
        const data = await updatePlayerInGame(3, 4, {
            "zombie": false,
            "human": true
        });
    }

    async function createKillTest() {
        const data = await createKillInGame(1,
            {
                "victimBiteCode": "[49, 48, 57, 52, 100, 98, 53, 56, 45, 102, 49, 49, 98, 45, 52, 57, 48, 57, 45, 56, 48, 52, 54, 45, 56, 53, 48, 99, 50, 48, 51, 56, 56, 102, 98, 53]",
                "killer_id": 3
            });

        console.log(data);
    }

    async function getAllKillsInGameTest() {
        const data = await getAllKillsInGame(3);
        console.log(data);
    }

    async function getKillInGameTest() {
        const data = await getKillInGame(3, 1);
        console.log(data);
    }

    async function delKill() {
        const data = await deleteKillInGame(1);
        console.log(data);
    }

    async function getUser() {
        const data = await getUserByUsername('natasha');
        console.log(data);
    }

    return (
        <div className="App">
            <ToastContainer/>
            <Navbar/>

            <Routes>
                <Route path="/" element={<GameListView/>}/>
                <Route path="/login" element={<LoginView/>}/>
                <Route path="/register" element={<RegisterView/>}/>
                <Route path="*" element={<NotFoundView/>}/>

                <Route element={<RequireAuth/>}>
                    <Route path="/configsession" element={<ConfigSession/>}/>
                    <Route path="/game/:id" element={<SessionDetailsView/>}/>
                    <Route path="/game/:id/player" element={<PlayerView/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>

            </Routes>

            <br/><br/><br/><br/><br/>
            <hr/>
            <div className="adminArea">
                {
                    isUserAdmin.current &&

                    <Collapsible className="adminArea" label="Testing Area">
                        <br/>
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
                        <hr/>
                        <button onClick={getPlayersInGame}>getAllPlayersInGame</button>
                        <hr/>
                        <button onClick={getPlayer}>getPlayerInGame</button>
                        <hr/>
                        <button onClick={updatePlayerTest}>update player</button>

                        <hr/>
                        <button onClick={createKillTest}>createKillTest</button>
                        <hr/>
                        <button onClick={getAllKillsInGameTest}>getAllKillsInGameTest</button>
                        <hr/>
                        <button onClick={getKillInGameTest}>getKillInGameTest</button>
                        <hr/>
                        <button onClick={delKill}>delKill</button>

                        <hr/>
                        <button onClick={getUser}>get user by username</button>
                    </Collapsible>
                }
            </div>
        </div>
    );
}

export default App;
