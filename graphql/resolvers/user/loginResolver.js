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

    if (!user) {
        return {
            token: null,
        };
    }
    
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if(passwordIsValid) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }

        return {
            token: jwt.sign(
                { user_id: user.user_id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            ),
        }
    }

    return {
        token: null,
    }
}

module.exports = loginResolver
