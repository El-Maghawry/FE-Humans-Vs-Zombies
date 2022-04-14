import {get, post} from "./apiFetchService";

async function createGame(access_token, gameName) {
    return post('/game', {gameName}, access_token)
}

async function getAllGames() {
    return await get('/game');
}

export {createGame,getAllGames};