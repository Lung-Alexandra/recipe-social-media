const {
    GraphQLNonNull,
    GraphQLID,
} = require('graphql');
const postLikeStatusType = require('../../types/like/postLikeStatusType');
const postLikeStatusResolver = require('../../resolvers/like/postLikeStatusResolver');

const postLikeStatus = {
    type: postLikeStatusType,
    args: {
        recipe_id: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: postLikeStatusResolver,
}

module.exports = postLikeStatus;