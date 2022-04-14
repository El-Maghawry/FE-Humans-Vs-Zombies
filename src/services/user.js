// let adminData = {
//     access_token: '',
//     expires_in: 0,
//     'not-before-policy': 0,
//     refresh_expires_in: 0,
//     refresh_token: '',
//     scope: '',
//     session_state: '',
//     token_type: "Bearer"
// }

export async function getAdminAccessToken(be, admin_username, admin_password, client_id, grant_type, url) {

    admin_username = admin_username ? admin_username : "admin"
    admin_password = admin_password ? admin_password : "admin"
    grant_type = grant_type ? grant_type: "password"
    client_id = client_id ? client_id : "admin-cli"
    url = url ? url:
        'https://app-keycloak-prod.herokuapp.com/auth/realms/master/protocol/openid-connect/token';




    const adminBody = {
        'username':  admin_username,
        'password': admin_password ,
        'grant_type': grant_type ,
        'client_id': client_id
    }
debugger
    try {

        const response = await fetch(url, {
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

        let adminData = await response.json();

        console.log(adminData);
        return adminData

        /*
        after awaiting the response the result will be an object like this bellow.
        To be able to register a new user you need the access_token:
        SEE registerNewUser function
        {
          access_token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzYzhTcHZLYl9UenJRZFJqcUxYRy1YR3pFZVc0dTc0cVhJNVVGTFlVZkEwIn0.eyJleHAiOjE2NDk3MDM4OTUsImlhdCI6MTY0OTcwMzgzNSwianRpIjoiNDM0NmUyNGYtOTI0MS00ZTg1LWI0YzYtYzA2M2QwOTIwNTkyIiwiaXNzIjoiaHR0cHM6Ly9hcHAta2V5Y2xvYWstcHJvZC5oZXJva3VhcHAuY29tL2F1dGgvcmVhbG1zL21hc3RlciIsInN1YiI6IjMwMTA5ZGQ1LTY4YTUtNDJiZi1hOTUyLWRjZThkYmNjYmE3MyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLWNsaSIsInNlc3Npb25fc3RhdGUiOiJkNGJiNDI1MC0wNWViLTQ4ZDktOGEzOC02NGQ2NDFkZGQyMTMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNiJdLCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJkNGJiNDI1MC0wNWViLTQ4ZDktOGEzOC02NGQ2NDFkZGQyMTMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.B2eDuA7IbfsThnbgJWtbNYp9JTYUuHunjr7iNwRs4dZz1ewta6lx0iZYDKNlMJ_ntWByZA9OIHYRerRjdzqiKlZeunqujeQe6aphdbdut75uUVoEhF71BrVnkyAGMsQLfeRvqn7akmWuTshrTJPFSo1aqqZJx9UUTUB5RZ9hqWP7QRJGqpwZ3OJwfqVzl4vl1nKdVJlW1zzO5iZQdE0otKM_NnNwZPjJFaRUiFWyRbRcMdY4ZI6W62Jv-e22xo2Lomu-r2Lw1GRwnJ3d0zn7rve1nU_3HoVO_TtI3Yr-kUXJpx-cEW93RwVq6tg5DFXxQfSeyl4A9i_eFJoyYRvAFw"
          expires_in: 60
          not-before-policy: 0
          refresh_expires_in: 1800
          refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJmMTc4MmRlNi1kOGRlLTRlOWItOGVhNy1mMjNlYjU1YzEzZjIifQ.eyJleHAiOjE2NDk3MDU2MzUsImlhdCI6MTY0OTcwMzgzNSwianRpIjoiNjQ2M2JjMTYtZWI1Ni00OTQ1LWJmNDQtY2NmOWI1MzQwMjA5IiwiaXNzIjoiaHR0cHM6Ly9hcHAta2V5Y2xvYWstcHJvZC5oZXJva3VhcHAuY29tL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6Imh0dHBzOi8vYXBwLWtleWNsb2FrLXByb2QuaGVyb2t1YXBwLmNvbS9hdXRoL3JlYWxtcy9tYXN0ZXIiLCJzdWIiOiIzMDEwOWRkNS02OGE1LTQyYmYtYTk1Mi1kY2U4ZGJjY2JhNzMiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiYWRtaW4tY2xpIiwic2Vzc2lvbl9zdGF0ZSI6ImQ0YmI0MjUwLTA1ZWItNDhkOS04YTM4LTY0ZDY0MWRkZDIxMyIsInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImQ0YmI0MjUwLTA1ZWItNDhkOS04YTM4LTY0ZDY0MWRkZDIxMyJ9.IUKBmIS47FIKWKtkV5HUE732c9146su5oOJvBPyq-Ag"
          scope: "profile email"
          session_state: "d4bb4250-05eb-48d9-8a38-64d641ddd213"
          token_type: "Bearer"
         }
         */

    } catch (e) {
        console.log(e.stackTrace);
    }
}

export async function registerNewUser(firstname, lastname, email, username, password, users_url, admin_username, admin_password, client_id, grant_type,admin_url) {
    /*
    first we need to get a valid admin access token by clicking on the Get Admin Access Token button,
    then simply we are making the following request
     */

    let adminData = getAdminAccessToken(admin_username, admin_password, client_id, grant_type, admin_url )

     users_url = users_url ? users_url:
         'https://app-keycloak-prod.herokuapp.com/auth/admin/realms/hvz/users';

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
        const response = await fetch(users_url, {
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

export async function login(username, password, client_id, url,) {
      url = url ? url:
          'https://app-keycloak-prod.herokuapp.com/auth/realms/hvz/protocol/openid-connect/token';

    const userLoginData = {
        // 'client_id': 'hvz-local', // or hvz-prod
        'client_id': client_id, // or hvz-prod
        // 'username': 'ivan',
        'username': username,
        // 'password': '123321',
        'password': password,
        'grant_type': 'password'
    };

    let responseUserData;

    try {
        const response = await fetch(url, {
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

        console.log(responseUserData);


    } catch (e) {
        console.log(e.stackTrace);
    }
}

