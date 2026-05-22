const { Model } = require('sequelize');
const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');

const schema = require('./graphql');

const app = express();
app.use(express.json());

const checkAuthorization = require("./middleware/authorization")

app.all('/graphql', checkAuthorization, createHandler({
    schema,
    context: (req) => {
        return req.raw.user;
    },
}))

module.exports = app;
