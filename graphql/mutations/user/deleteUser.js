const {
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean
} = require('graphql');
const deleteUserResolver = require('../../resolvers/user/deleteUserResolver');

const deleteUser = {
    type: GraphQLBoolean,
    args: {
        user_id: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: deleteUserResolver
}

module.exports = deleteUser;