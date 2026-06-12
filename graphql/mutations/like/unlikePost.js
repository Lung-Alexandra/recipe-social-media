const unlikePostResolver = require('../../resolvers/like/unlikePostResolver');
const { GraphQLBoolean, GraphQLInt, GraphQLNonNull } = require('graphql');

const unlikePost = {
    type: GraphQLBoolean,
    args: {
      recipe_id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: unlikePostResolver,
}

module.exports = unlikePost;
