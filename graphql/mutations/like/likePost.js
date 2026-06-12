const LikeType = require('../../types/like/likeType');
const likePostResolver = require('../../resolvers/like/likePostResolver');
const { GraphQLInt, GraphQLNonNull } = require('graphql');

const likePost = {
    type: LikeType,
    args: {
      recipe_id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: likePostResolver,
}

module.exports = likePost;
