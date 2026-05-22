const { GraphQLList } = require('graphql');
const { 
    GraphQLObjectType, 
    GraphQLInt
} = require('graphql');
const CommentType = require('./commentType');

const PostCommentsType = new GraphQLObjectType({
    name: 'PostComments',
    fields: () => ({
      count: {
        type: GraphQLInt,
      },
      comments: {
        type: new GraphQLList(CommentType),
      },
    })
});

module.exports = PostCommentsType;
