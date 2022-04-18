import {get, post, put} from "./apiFetchServiceWrapper";

async function createUser() {
    return await post('/user');
}

async function getAllUser() {
    return await get('/user');
}

async function updateUser(userId, userData) {
    return await put(`/user/${userId}`, userData);
}

export {createUser, getAllUser, updateUser};