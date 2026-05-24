# Summary 
Recipe Social Media is a full-stack social platform focused on cooking content. Users can create accounts, sign in with email and password or Google OAuth2, publish recipe posts, browse a shared feed, visit profiles, and interact through likes and comments. The application combines social features with a recipe-sharing workflow.

From a technical perspective, the project covers a complete JavaScript full-stack setup. The backend is built with Node.js and Express, uses GraphQL for the API layer, Sequelize for database access, PostgreSQL for persistence, JWT for authentication, and Google OAuth2 for third-party login. The frontend is built with React and Vite and communicates with the backend through GraphQL requests. Overall, the application highlights practical concepts such as authentication and authorization, OAuth callback handling, relational database modeling, protected routes, CORS configuration, and the separation between frontend and backend in production.

# Setup

1. Clone this repo
2. ``` npm i ``` in the project root
3. Create a ```.env``` file. It should contain a field called ```DB_LINK``` with the connection link to your database.
4. Run ```npm start``` to start the server
5. Run ```npm run dev``` for local development with auto-reload

# Frontend

1. Go to the React app: ```cd frontend```
2. Install dependencies: ```npm i```
3. Optionally create a frontend env file from ```frontend/.env.example```
4. Start the frontend: ```npm run dev```
5. The dev server proxies GraphQL requests to ```http://localhost:3000/graphql```

Useful root-level shortcuts:
- ```npm run frontend:dev```
- ```npm run frontend:build```

# OAuth2 login

Google OAuth2 is available through the backend.

Required backend `.env` fields:

```env
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
OAUTH_SUCCESS_REDIRECT="http://localhost:5173"
```

In Google Cloud Console, add this authorized redirect URI:

```text
http://localhost:3000/auth/google/callback
```

The React app calls `/auth/google`, the backend handles the OAuth callback, creates or finds the user by verified email, signs the app JWT, then redirects back to the frontend.

# Demo data

Run this after migrations to populate the app with demo users, tags, recipes, likes, and comments:

``` npm run seed:demo ```

Demo users:
- ```ana.demo@example.com```
- ```mihai.demo@example.com```
- ```irina.demo@example.com```

All demo users use this password:
``` Demo123456! ```

# Migrations
1. Make sure the project setup is finished
2. To create a model run ```npx sequelize-cli model:generate --name <model name> --attributes <list of attributes and type>```, for instance ```npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,userName:string```
3. Execute ```npx sequelize-cli db:migrate```, which effectively does the migration.
4. The tables should be created in this order:
   - `Users`
   - `Tags`
   - `Recipes` (depends on `Users`)
   - `UserSettings` (depends on `Users`)
   - `Comments` (depends on `Users` and `Recipes`)
   - `Likes` (depends on `Users` and `Recipes`)
   - `RecipeTags` (depends on `Recipes` and `Tags`)

# DB description
![DB diagram](/assets/Db_diagram.svg)

# How to use jwt login with altair

0. Make sure u have ```JWT_SECRET = "<anything you want>"``` in the ```.env``` file 
1. Perform a correct ```login``` and get the jwt token
2. From the upper left headers (sun like symbol) create the header with ```Authorization```  ```Bearer <your_jwt_token>```
