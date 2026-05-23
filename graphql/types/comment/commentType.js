const { 
    GraphQLObjectType, 
    GraphQLID,
    GraphQLString
} = require('graphql');
const GraphQLDate = require('graphql-date');
const db = require('../../../models');
const UserType = require('../user/userType');

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
      },
      author: {
        type: UserType,
        async resolve(parent) {
          return await db.User.findByPk(parent.user_id);
        },
      }
    })
});

module.exports = CommentType;
