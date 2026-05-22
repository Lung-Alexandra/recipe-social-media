
const deleteCommentResolver = require('../../resolvers/comment/deleteCommentResolver');
const DeleteCommentInputType = require('../../types/comment/deleteCommentInputType');
const { GraphQLBoolean } = require('graphql');

const deleteComment = {
    type: GraphQLBoolean,
    args: {
      comment: {
        type: DeleteCommentInputType,
      },
    },
    resolve: deleteCommentResolver,
}

module.exports = deleteComment;