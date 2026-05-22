const { 
    GraphQLObjectType, 
    GraphQLID,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');

const CommentType = new GraphQLObjectType({
    name: 'Comment',
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
      date_commented: {
        type: GraphQLDate,
      },
      comment_text: {
        type: GraphQLString
      }
    })
});

module.exports = CommentType;
