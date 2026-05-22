const unlikePostResolver = require('../../resolvers/like/unlikePostResolver');
const { GraphQLBoolean, GraphQLInt } = require('graphql');

const unlikePost = {
    type: GraphQLBoolean,
    args: {
      recipe_id: {
        type: GraphQLInt,
      },
    },
    resolve: unlikePostResolver,
}

module.exports = unlikePost;