const {
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean
} = require('graphql');
const UserType = require('../../types/user/userType');
const updateUserResolver = require('../../resolvers/user/updateUserResolver');
const userUpdateInputType = require('../../types/user/userUpdateInputType');

const updateUser = {
    type: UserType,
    args: {
        user: {
            type: userUpdateInputType,
        },
    },
    resolve: updateUserResolver,
}

module.exports = updateUser;
