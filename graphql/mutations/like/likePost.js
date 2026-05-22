const LikeType = require('../../types/like/likeType');
const likePostResolver = require('../../resolvers/like/likePostResolver');
const { GraphQLInt } = require('graphql');

const likePost = {
    type: LikeType,
    args: {
      recipe_id: {
        type: GraphQLInt,
      },
    },
    resolve: likePostResolver,
}

module.exports = likePost;