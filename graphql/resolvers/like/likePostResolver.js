const db = require('../../../models');

const likePostResolver = async (_, { recipe_id }, context) => {
    date_liked = new Date();
    let user_id = context.user_id;
    const newLike = await db.Like.create({
        user_id,
        recipe_id,
        date_liked,
    });
  
    return newLike;
}

module.exports = likePostResolver;