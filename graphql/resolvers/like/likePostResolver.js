const db = require('../../../models');
const requireAuthenticatedUser = require('../requireAuthenticatedUser');

const likePostResolver = async (_, { recipe_id }, context) => {
    const user_id = requireAuthenticatedUser(context);

    const [like] = await db.Like.findOrCreate({
        where: {
            user_id,
            recipe_id,
        },
        defaults: {
            date_liked: new Date(),
        },
    });

    return like;
}

module.exports = likePostResolver;
