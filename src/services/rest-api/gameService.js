import {get, post, del, put} from "./apiFetchServiceWrapper";
import {GAME_STATE_TYPES} from './gameStateTypes';

async function createGame(name, description) {
    let game = {
        'name': name,
        'description': description
    };
    return post('/game', game);
}

async function getAllGames() {
    return await get('/game');
}

async function getGameById(gameId) {
    return await get(`/game/${gameId}`);
}

async function deleteGame(gameId) {
    return await del(`/game/${gameId}`);
}

async function updateGame(gameId, gameChanges) {
    if (gameChanges.gameState) {
        if (!checkGameState(gameChanges.gameState)) {
            throw new Error('Game state not exist');
        }
    }

    return await put(`/game/${gameId}`, gameChanges);
}

function checkGameState(gameState) {
    return gameState === GAME_STATE_TYPES.complete
        || gameState === GAME_STATE_TYPES.in_progress
        || gameState === GAME_STATE_TYPES.registration;
}


export {
    createGame,
    getAllGames,
    getGameById,
    deleteGame,
    updateGame
};