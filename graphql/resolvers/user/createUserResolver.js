const bcrypt = require('bcrypt');
const db = require('../../../models');

const createUserResolver = async (_, { user }) => {
    const { username, email, password, profile_picture, bio } = user;
    let { date_joined } = user;
    if (date_joined === undefined) date_joined = new Date();

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = await db.User.create({
        username,
        email,
        password: hashedPassword,
        profile_picture,
        bio,
        date_joined
    });

    return newUser;
}

module.exports = createUserResolver;
