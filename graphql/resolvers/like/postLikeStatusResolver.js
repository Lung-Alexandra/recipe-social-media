const db = require('../../../models');

const postLikeStatusResolver = async (_, { recipe_id }, context) => {
    const count1 = await db.Like.count({
        where: {
            recipe_id: recipe_id
        }
    });

    const count2 = context?.user_id ? await db.Like.count({
        where: {
            recipe_id: recipe_id,
            user_id: context.user_id,
        }
    }) : 0;

    return {
        count: count1,
        userLiked: count2 != 0,
    };
}

module.exports = postLikeStatusResolver;
