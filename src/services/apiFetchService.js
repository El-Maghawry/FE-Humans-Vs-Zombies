const API_HOST = 'http://localhost:5001/api';

async function request(url, options) {
    try {
        const response = await fetch(API_HOST + url, options);

        if (response.ok !== true) {
            if (response.status == 403 || response.status == 401) {
                console.log("Not authorized");
            }

            const error = await response.json();
            throw new Error(error.message);
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

async function post(url, data, access_token) {
    return request(url, createOptions('post', data, access_token));
}

async function put(url, data, access_token) {
    return request(url, createOptions('put', data, access_token));
}

async function del(url, access_token) {
    return request(url, createOptions('delete','',access_token));
}

export {get,post,put,del};