import {get, post, put} from "./apiFetchServiceWrapper";

async function createPlayer(gameId, playerData) {
    return await post(`/game/${gameId}/player`, playerData);
}

async function getAllPlayersInGame(gameId){
    return await get(`/game/${gameId}/player`);
}

async function updatePlayerInGame(gameId, playerId, playerData){
    return await put(`/game/${gameId}/player/${playerId}`, playerData);
}

async function getPlayerInGame(gameId, playerId ){
    return await get(`/game/${gameId}/player/${playerId}`);
}

export {
    createPlayer,
    getAllPlayersInGame,
    updatePlayerInGame,
    getPlayerInGame
}