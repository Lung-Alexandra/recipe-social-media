const db = require('../../../models');
const requireAuthenticatedUser = require('../requireAuthenticatedUser');

const unlikePostResolver = async (_, { recipe_id }, context) => {
    const user_id = requireAuthenticatedUser(context);

    const {count, rows} = await db.Like.findAndCountAll(
        {where: {
            user_id,
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
        throw new Error(`Error deleting like from user: ${user_id} for post: ${recipe_id}`);
    }
}

module.exports = unlikePostResolver;
