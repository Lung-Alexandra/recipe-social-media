const express = require('express');
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');

const schema = require('./graphql');

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim());

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error('Not allowed by CORS'));
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const checkAuthorization = require("./middleware/authorization")
const oauthRoutes = require('./routes/oauth');

app.use('/auth', oauthRoutes);

app.all('/graphql', checkAuthorization, createHandler({
    schema,
    context: (req) => {
        return req.raw.user;
    },
}))

module.exports = app;
