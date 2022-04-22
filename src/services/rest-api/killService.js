import {get, post, del} from "./apiFetchServiceWrapper";

async function getAllKillsInGame(gameId) {
    return await get(`/game/${gameId}/kill`);
}

async function createKillInGame(gameId, killData) {
    return await post(`/game/${gameId}/kill`, killData);
}

async function getKillInGame(gameId, killId) {
    return await get(`/game/${gameId}/kill/${killId}`);
}

async function deleteKillInGame( killId) {
    return await del(`/game/kill/${killId}`);
}


export {
    getAllKillsInGame,
    createKillInGame,
    getKillInGame,
    deleteKillInGame
};