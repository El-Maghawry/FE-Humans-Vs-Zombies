const API_HOST = 'http://localhost:5001';

async function createGame(access_token, gameName){
    const response = await fetch( 'http://localhost:5001/api/game',{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },

        body:JSON.stringify({gameName: 'asdasadasdasdasd'})
    });

    if (!response.ok) {
        throw new Error('Fetching not successful');
    }

    return await response.json();
}

export {createGame};