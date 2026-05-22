const CommentType = require('../../types/comment/commentType');
const editCommentResolver = require('../../resolvers/comment/editCommentResolver');
const CommentInputType = require('../../types/comment/commentInputType');
const { GraphQLID } = require('graphql');

const editComment = {
    type: CommentType,
    args: {
      comment: {
        type: CommentInputType,
      },
      id: {
        type: GraphQLID,
      },
    },
    resolve: editCommentResolver,
}

module.exports = editComment;