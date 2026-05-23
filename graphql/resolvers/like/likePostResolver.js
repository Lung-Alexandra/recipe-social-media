const db = require('../../../models');

const likePostResolver = async (_, { recipe_id }, context) => {
    if (!context?.user_id) {
        throw new Error('Authentication required');
    }

    const [like] = await db.Like.findOrCreate({
        where: {
            user_id: context.user_id,
            recipe_id,
        },
        defaults: {
            date_liked: new Date(),
        },
    });

    return like;
}

module.exports = likePostResolver;
