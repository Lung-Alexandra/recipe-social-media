# Summary 
    TO DO

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
