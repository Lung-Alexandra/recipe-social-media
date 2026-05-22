const db = require('../../../models');

const addCommentResolver = async (_, { comment }, context) => {
    const { recipe_id, comment_text } = comment;
    date_commented = new Date();
    let user_id = context.user_id;
    const newComment = await db.Comment.create({
        user_id,
        recipe_id,
        comment_text,
        date_commented,
    });
  
    return newComment;
}

module.exports = addCommentResolver;