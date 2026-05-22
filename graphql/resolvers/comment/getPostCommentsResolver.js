const db = require('../../../models');
const PostCommentType = require('../../types/comment/postCommentsType');


const getPostCommentsResolver = async (_, { recipe_id }) => {
    const { count, rows } = await db.Comment.findAndCountAll({
        where: {
            recipe_id: recipe_id,
        },
        order: [
            ['date_commented', 'DESC'],
        ],
    });

    return {
        count: count,
        comments: rows,
    };
}

module.exports = getPostCommentsResolver;