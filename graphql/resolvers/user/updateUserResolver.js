const bcrypt = require('bcrypt');
const db = require('../../../models');

const updateUserResolver = async (_, args , context) => {
  
  try {
    const {user} = args;
    const { username, email, password, profile_picture, bio, date_joined } = user;
    const user_id = context.user_id;

    const targetUser = await db.User.findByPk(user_id);

    if (!targetUser) {
      throw new Error('User not found');
    }

    if (username !== undefined) targetUser.username = username;
    if (email !== undefined) targetUser.email = email;
    if (password !== undefined) {
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      targetUser.password = hashedPassword;
    };
    if (profile_picture !== undefined) targetUser.profile_picture = profile_picture;
    if (bio !== undefined) targetUser.bio = bio;
    if (date_joined !== undefined) targetUser.date_joined = date_joined;

    await targetUser.save();

    return targetUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

module.exports = updateUserResolver;
