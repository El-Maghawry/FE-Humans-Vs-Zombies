import {get, post, put} from "./apiFetchServiceWrapper";

async function createPlayer(gameId, playerData) {
    return await post(`/game/${gameId}/player`, playerData);
}

async function getAllPlayersForGame(gameId){
    return await get(`/game/${gameId}/player`);
}

async function updatePlayerInGame(gameId, playerId, playerData){
    return await put(`/game/${gameId}/player/${playerId}`, playerData);
}

async function getPlayerForGame(gameId, playerId, ){
    return await get(`/game/${gameId}/player/${playerId}`);
}

export {
    createPlayer,
    getAllPlayersForGame,
    updatePlayerInGame,
    getPlayerForGame
}