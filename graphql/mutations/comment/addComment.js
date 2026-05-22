const CommentType = require('../../types/comment/commentType');
const addCommentResolver = require('../../resolvers/comment/addCommentResolver');
const CommentInputType = require('../../types/comment/commentInputType');

const addComment = {
    type: CommentType,
    args: {
      comment: {
        type: CommentInputType,
      },
    },
    resolve: addCommentResolver,
}

module.exports = addComment;