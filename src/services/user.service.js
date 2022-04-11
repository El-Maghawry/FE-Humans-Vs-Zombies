import axios from "axios";

const qs = require('qs');

let keycloak_url = "https://app-keycloak-prod.herokuapp.com/auth/admin/realms/hvz/"

export default async function registerUser(firstname, lastname, password, email, username) {
    debugger
    try {
        const response = await axios({
            method: "post",
            url: keycloak_url + 'users',
            data: {
                "firstName": firstname,
                "lastName": lastname,
                "email": email,
                "enabled": "true",
                "username": username,
                "credentials": [{
                    "type": "password",
                    "value": password,
                    "temporary": false
                },
                ]
            },
            headers: {}
        })

        console.log(response);
    } catch (error) {
        console.log(error);
    }
    ;

}

async function getAdminToken() {
    debugger
    const data = qs.stringify({
        'username': 'admin',
        'password': 'admin',
        'grant_type': 'password',
        'client_id': 'hvz-local'
    });

    const config = {
        method: 'post',
        url: 'https://app-keycloak-prod.herokuapp.com/auth/realms/master/protocol/openid-connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log('%c' + JSON.stringify(response.data), 'background: #222; color: #bada55');
        })
        .catch(function (error) {
            console.log(error);
        });

}


export {registerUser, getAdminToken}