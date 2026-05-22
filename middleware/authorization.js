const db = require('../models');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const checkAuthorization = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        next();
        return;
    }

    try {
        const token = authorization.replace('Bearer ', '');
        console.log(token)
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log(data, data.user_id)
        const user = await db.User.findByPk(data.user_id);

        if (user) {
            console.log(`Jwt login as ${user.username}`)
            req.user = user.dataValues;
        }

        next();
    } catch (error) {
        console.log(`Error authentificating: ${error.message}`);
        next();
    }
}

module.exports = checkAuthorization
