const {
    GraphQLNonNull,
    GraphQLID,
} = require('graphql');
const PostCommentType = require('../../types/comment/postCommentsType');
const getPostCommentsResolver = require('../../resolvers/comment/getPostCommentsResolver');

const getPostComments = {
    type: PostCommentType,
    args: {
        recipe_id: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: getPostCommentsResolver,
}

module.exports = getPostComments;