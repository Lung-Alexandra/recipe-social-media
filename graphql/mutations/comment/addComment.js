const CommentType = require('../../types/comment/commentType');
const addCommentResolver = require('../../resolvers/comment/addCommentResolver');
const CommentInputType = require('../../types/comment/commentInputType');
const { GraphQLNonNull } = require('graphql');

const addComment = {
    type: CommentType,
    args: {
      comment: {
        type: new GraphQLNonNull(CommentInputType),
      },
    },
    resolve: addCommentResolver,
}

module.exports = addComment;
