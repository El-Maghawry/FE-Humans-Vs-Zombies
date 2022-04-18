import {refreshUserAccessToken} from "../keycloak/authService";

const API_HOST = 'http://localhost:5001/api';

async function request(url, options) {
    try {
        let hasAuthErr = false;
        let response = await fetch(API_HOST + url, options);

        if (response.ok !== true) {
            if (response.status == 403 || response.status == 401) {
                console.log("Not authorized, refreshing the access token");

                let userData = JSON.parse(localStorage.getItem(`<USER>`));
                await refreshUserAccessToken(userData.refresh_token);

                hasAuthErr = true;
                const access_token = getAccessToken();

                options.headers['access_token'] = `Bearer ${access_token}`;
                response = await fetch(API_HOST + url, options);

                if (response.ok !== true) {
                    hasAuthErr = false;
                }
            }

            if (!hasAuthErr) {
                const error = await response.json();
                throw new Error(error.message);
            }
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function createOptions(method = 'get', data, access_token) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined || data !== '') {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    if (access_token !== undefined) {
        options.headers['Authorization'] = `Bearer ${access_token}`;
    }

    return options;
}

async function get(url) {
    return request(url, createOptions());
}

async function post(url, data) {
    return request(url, createOptions('post', data | undefined, getAccessToken()));
}

async function put(url, data) {
    return request(url, createOptions('put', data, getAccessToken()));
}

async function del(url) {
    return request(url, createOptions('delete', '', getAccessToken()));
}

function getAccessToken() {
    return JSON.parse(localStorage.getItem('<USER>')).access_token;
}

export {get, post, put, del};