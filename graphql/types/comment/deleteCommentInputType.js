const { GraphQLInputObjectType, GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');

const deleteCommentInputType = new GraphQLInputObjectType({
    name: "DeleteCommentInputType",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        }
    }
});

module.exports = deleteCommentInputType;