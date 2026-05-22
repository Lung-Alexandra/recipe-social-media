const { GraphQLInputObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');

const commentInputType = new GraphQLInputObjectType({
    name: "CommentInputType",
    fields: {
        recipe_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        comment_text: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }
});

module.exports = commentInputType;