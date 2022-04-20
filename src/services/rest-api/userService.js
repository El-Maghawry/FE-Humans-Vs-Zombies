import {get, post, put} from "./apiFetchServiceWrapper";

async function createUserInApi() {
    return await post('/user');
}

async function getAllUsers() {
    return await get('/user');
}

async function updateUser(userId, userData) {
    return await put(`/user/${userId}`, userData);
}

export {createUserInApi, getAllUsers, updateUser};