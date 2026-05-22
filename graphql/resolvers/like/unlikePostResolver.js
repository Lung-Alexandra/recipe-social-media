const db = require('../../../models');

const unlikePostResolver = async (_, { recipe_id }, context) => {
    const {count, rows} = await db.Like.findAndCountAll(
        {where: {
            user_id: context.user_id,
            recipe_id: recipe_id,
        }
    });

    if (count == 0) {
        throw new Error("Like doesn't exist");
    }

    if(count >= 2) {
        throw new Error("There is an error in the database, found 2 likes from this user to same post");
    }

    try {
        await rows[0].destroy();

        return true;

    } catch {
        throw new Error(`Error deleting like from user: ${context.user_id} for post: ${recipe_id}`);
    }
}

module.exports = unlikePostResolver;