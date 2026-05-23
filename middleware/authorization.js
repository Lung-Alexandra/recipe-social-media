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
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await db.User.findByPk(data.user_id);

        if (user) {
            req.user = {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
            };
        }

        next();
    } catch (error) {
        console.log(`Error authentificating: ${error.message}`);
        next();
    }
}

module.exports = checkAuthorization
