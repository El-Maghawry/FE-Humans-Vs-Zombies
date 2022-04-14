const AUTH_HOST = 'https://app-keycloak-prod.herokuapp.com';
const HVZ_PROD_CLIENT = "hvz-prod";
const HVZ_LOCAL_CLIENT = "hvz-local";
const ADMIN_TOKEN_ENDPOINT = 'https://app-keycloak-prod.herokuapp.com/auth/realms/master/protocol/openid-connect/token'
const LOGIN_ENDPOINT = 'https://app-keycloak-prod.herokuapp.com/auth/realms/hvz/protocol/openid-connect/token'
const USER_REGISTER_ENDPOINT = 'https://app-keycloak-prod.herokuapp.com/auth/admin/realms/hvz/users'
const REFRESH_TOKEN_ENDPOINT = 'https://app-keycloak-prod.herokuapp.com/auth/realms/hvz/protocol/openid-connect/token'
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin'
const GRANT_TYPE = 'password'
const CLIENT_ID = 'admin-cli'

export async function getAdminAccessToken() {
    const adminBody = {
        'username': ADMIN_USERNAME,
        'password': ADMIN_PASSWORD,
        'grant_type': GRANT_TYPE,
        'client_id': CLIENT_ID
    }

    try {
        const response = await fetch(ADMIN_TOKEN_ENDPOINT, {
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

export async function registerNewUser(firstname, lastname, email, username, password) {
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
    }

    try {
        const response = await fetch(USER_REGISTER_ENDPOINT, {
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

        console.log(`${username} was registered`);
    } catch (e) {
        console.log(e.stackTrace);
    }
}

export async function login(username, password) {
    const userLoginData = {
        'client_id': HVZ_PROD_CLIENT,
        'username': username,
        'password': password,
        'grant_type': 'password'
    };


    let responseUserData;

    try {
        const response = await fetch(LOGIN_ENDPOINT, {
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

        return responseUserData;

    } catch (e) {
        console.log(e.stackTrace);
    }
}


export async function refreshUserAccessToken(refresh_token) {
    const userLoginData = {
        'client_id': HVZ_PROD_CLIENT,
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    };

    let responseUserData;

    try {
        const response = await fetch(LOGIN_ENDPOINT, {
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

        return responseUserData;

    } catch (e) {
        console.log(e.stackTrace);
    }
}

/*
Method: POST
URL: https://keycloak.example.com/auth/realms/myrealm/protocol/openid-connect/token
Body type: x-www-form-urlencoded
Form fields:
client_id : <my-client-name>
grant_type : refresh_token
refresh_token: <my-refresh-token>
 */
