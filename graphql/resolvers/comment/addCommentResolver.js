const db = require('../../../models');
const requireAuthenticatedUser = require('../requireAuthenticatedUser');

const addCommentResolver = async (_, { comment }, context) => {
    const user_id = requireAuthenticatedUser(context);
    const { recipe_id, comment_text } = comment;
    const date_commented = new Date();
    const newComment = await db.Comment.create({
        user_id,
        recipe_id,
        comment_text,
        date_commented,
    });
  
    return newComment;
}

module.exports = addCommentResolver;
