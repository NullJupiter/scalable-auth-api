# scalable-auth-api with NodeJS and MongoDB

### First Steps
- Install NodeJS
- Install Docker and docker-compose
- `git clone https://github.com/NullJupiter/scalable-auth-api.git`
- `npm install` in the api directory
- `mkdir database` to create a database directory where all the mongodb data will be stored.
- `docker-compose up -d mongodb` to start the database service
- `docker exec -it mongodb bash` to get a bash shell in the database service
- `mongo` to login into mongodb shell
- Create an admin user and a user with `readWrite` permissions to a certain database.
- `docker-compose down mongodb` to stop the database service as it is now configured.
- Provide the environment variables in `docker-compose.yml`. Note that if you change the name of the database service you need to change the default `DB_IP` to it. You also need to change the api port mapping in the `docker-compose.yml` file if you change the default value of `API_INTERNAL_PORT`.


### Usage
Use the command `docker-compose up -d` in the root directory to start the API.


### Routes
- `/api/user/register` - POST
    - Input: name, email and password.
    - Output: User ID or error.
- `/api/user/login` - POST
    - Input: email, password.
    - Output: `Logged In!` or error. The header `auth-token` holds the jwt token on success.
- `/api/info` - GET
    - Input: The request header `auth-token` needs to be set to the corresponding jwt.
    - Output: Information about the logged in user or an error. 
