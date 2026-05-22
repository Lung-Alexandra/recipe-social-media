const { GraphQLObjectType, GraphQLID, } = require('graphql');
const GraphQLDate = require('graphql-date');

const likeType = new GraphQLObjectType({
    name: "LikeType",
    fields: () => ({
      id: {
        type: GraphQLID,
      },
      user_id: {
        type: GraphQLID,
      },
      recipe_id: {
        type: GraphQLID,
      },
      date_liked: {
        type: GraphQLDate,
      }
    })
});

module.exports = likeType;