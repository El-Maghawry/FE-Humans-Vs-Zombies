import {createUserInApi} from "../rest-api/userService";

const HOST = 'https://app-keycloak-prod.herokuapp.com';

async function getAdminAccessToken() {
    const adminBody = {
        'username': 'admin',
        'password': 'admin',
        'grant_type': 'password',
        'client_id': 'admin-cli'
    };

    try {
        const response = await fetch(HOST + '/auth/realms/master/protocol/openid-connect/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            /*
            to be able to make an x-www-form-urlencoded request, the body must be in URLSearchParams format, not JSON.
             */
            body: new URLSearchParams(adminBody)
        });

        if (!response.ok) {
            throw new Error('Fetching admin token not successful');
        }

        return await response.json();

    } catch (e) {
        console.log(e.stackTrace);
    }
}

async function registerNewUser(firstname, lastname, email, username, password) {
    /*
    first we need to get a valid admin access token by clicking on the Get Admin Access Token button,
    then simply we are making the following request
     */

    let adminData = await getAdminAccessToken();

    const newUserData = {
        "firstName": firstname,
        "lastName": lastname,
        "email": email,
        "enabled": "true",
        "username": username,
        "credentials": [{
            "type": "password",
            "value": password,
            "temporary": false
        }]
    };

    try {
        const response = await fetch(HOST + '/auth/admin/realms/hvz/users', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminData.access_token}`,
                'Content-Type': 'application/json',
            },
            /*
             hire we are making a normal application json request
             */
            body: JSON.stringify(newUserData)
        });

        if (!response.ok) {
            throw new Error('User registration not successful');
        }

        await login(newUserData.username, newUserData.credentials[0].value);
        await createUserInApi();

        console.log(`${username} was registered and logged in`);
        return true;
    } catch (e) {
        console.log(e.stackTrace);
        return false;
    }
}

async function login(username, password) {
    const userLoginData = {
        'client_id': 'hvz-prod',
        'username': username,
        'password': password,
        'grant_type': 'password'
    };


    let responseUserData;

    try {
        const response = await fetch(HOST + '/auth/realms/hvz/protocol/openid-connect/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            /*
            hire again x-www-form-urlencoded format
             */
            body: new URLSearchParams(userLoginData)
        });

        if (!response.ok) {
            throw new Error('Fetching data not successful');
        }

        responseUserData = await response.json();

        let jwtPayload = parseJwt(responseUserData.access_token);
        let isUserAdmin = false;

        if (jwtPayload.roles) {
            isUserAdmin = jwtPayload.roles.includes('admin-role');
        }

        responseUserData.username = username;
        responseUserData.isAdmin = isUserAdmin;
        localStorage.setItem('<USER>', JSON.stringify(responseUserData));

        return responseUserData;
    } catch (e) {
        console.log(e.stackTrace);
    }
}

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


async function refreshUserAccessToken(refresh_token) {
    const userLoginData = {
        'client_id': 'hvz-prod',
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    };

    let responseUserData;

    try {
        const response = await fetch(HOST + '/auth/realms/hvz/protocol/openid-connect/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            /*
            hire again x-www-form-urlencoded format
             */
            body: new URLSearchParams(userLoginData)
        });

        if (!response.ok) {
            throw new Error('Fetching data not successful');
        }

        responseUserData = await response.json();

        let oldUserData = JSON.parse(localStorage.getItem('<USER>'));

        if (oldUserData) {
            responseUserData.username = oldUserData.username;
            localStorage.removeItem('<USER>');
            let jwtPayload = parseJwt(responseUserData.access_token);
            let isUserAdmin = false;

            if (jwtPayload.roles) {
                isUserAdmin = jwtPayload.roles.includes('admin-role');
            }
            responseUserData.isAdmin = isUserAdmin;
            localStorage.setItem('<USER>', JSON.stringify(responseUserData));
        }

        return responseUserData;

    } catch (e) {
        console.log(e.stackTrace);
    }
}

function logout() {
    localStorage.clear();
    return true;
}

export {
    getAdminAccessToken,
    registerNewUser,
    login,
    refreshUserAccessToken,
    logout
};
