import {get, post, put} from "./apiFetchServiceWrapper";

async function createUser()
{
    debugger
    return await post('/user');
}

async function getAllUsers() {
    return await get('/user');
}

async function updateUser(userId, userData) {
    return await put(`/user/${userId}`, userData);
}

async function getUser(userId) {
    return await get(`/user/${userId}`);
}

export {createUser, getAllUsers, updateUser, getUser};