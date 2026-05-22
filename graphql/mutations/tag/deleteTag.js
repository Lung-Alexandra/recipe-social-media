const {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLID,
} = require('graphql');

const deleteTagResolver = require('../../resolvers/tag/deleteTagResolver');

const deleteTag = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: deleteTagResolver,
}

module.exports = deleteTag;
