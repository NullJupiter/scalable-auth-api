# scalable-auth-api with NodeJS

### Usage
- Install NodeJS
- Install Docker and docker-compose
- `git clone https://github.com/NullJupiter/scalable-auth-api.git`
- `npm install` in the api directory
- `docker-compose up -d` in the root directory

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
