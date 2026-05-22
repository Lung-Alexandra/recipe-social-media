const { GraphQLObjectType, GraphQLInt, GraphQLBoolean, } = require('graphql');
const GraphQLDate = require('graphql-date');

const postLikeStatusType = new GraphQLObjectType({
    name: "PostLikeStatus",
    fields: () => ({
      count: {
        type: GraphQLInt,
      },
      userLiked: {
        type: GraphQLBoolean,
      }
    })
});

module.exports = postLikeStatusType;
