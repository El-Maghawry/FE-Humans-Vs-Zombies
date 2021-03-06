# Case Period: Humans vs. Zombies

This application implements a management application for the game Humans vs. Zombies



## Storage
The application data are stored in a postgres database. 

## Frontend 

The Frontend is implemented in react and enables users to manage all the game information.
It stores and fetches all the data in the postgres database using the REST API in the backend.
You can find the code <a href="https://gitlab.com/gitlab-experis-petar_phil/hvz-game-ginal_case_frontend">here</a>.
The application is deployed <a href="https://hvz-game-case.herokuapp.com/">here</a>.
Here you can see how the user interface looks:

<details>
  <summary>home page</summary>
  <img src="public/screenshots/HomePage.jpg">
</details>
<details>
  <summary>profile page</summary>
  <img src="public/screenshots/ProfilePage.jpg">
</details>
<details>
  <summary>new game</summary>
  <img src="public/screenshots/NewGame.jpg">
</details>
<details>
  <summary>game details as player</summary>
  <img src="public/screenshots/GameDetailsAsPlayer.jpg">
</details>
<details>
  <summary>game details as admin</summary>
  <img src="public/screenshots/GameDetailsAsAdmin.jpg">
</details>

## Backend

The backend is implemented using spring and provides a REST API for the data stored in the postgres database.
It is deployed <a href="https://rest-api-hvz.herokuapp.com/swagger-ui/index.html">here</a>.
You can find the code on <a href="https://gitlab.com/PetarDimitrov91/hvz-game-final_case">gitlab</a>.
You can also have a look at the endpoints <a href="public/documents/endpoints.pdf" type=file>here</a>.



## Security
To protect the backend from unauthorized access keycloak is used.


## Usage

To access the application you can simply use the <a href="https://hvz-game-case.herokuapp.com/">frontend link</a>. 
If you want to run it locally you can clone the backend repo and run ```docker compose up -d``` in the project root directories.
Afterwards you need to clone the frontend repo, set your config in the .env file and run ```npm run start``` in the frontend root directory.



## Maintainer

[Petar Dimitrov]

[Philipp Loibl]

[Igor Figueiredo]

[Mohammed El Maghawry]

## License

[MIT]
---

[Petar Dimitrov]: https://github.com/PetarDimitrov91

[Philipp Loibl]: https://gitlab.com/Loibl33

[Igor Figueiredo]: https://gitlab.com/Igor-GF

[Mohammed El Maghawry]: https://gitlab.com/El-Maghawry

[MIT]: https://choosealicense.com/licenses/mit/


