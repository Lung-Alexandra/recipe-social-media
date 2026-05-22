const db = require('../../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginResolver = async (_, args, context) => {
    const { email, password } = args;
    const user = await db.User.findOne({
        where: {
            email,
        }
    });
    
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if(passwordIsValid) {
        return {
            token: jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET),
        }
    }

    return {
        token: null,
    }
}

module.exports = loginResolver