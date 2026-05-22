const deleteUserSettingResolver = require('../../resolvers/userSetting/deleteUserSettingResolver');
const { GraphQLBoolean } = require('graphql');

const deleteUserSetting = {
    type: GraphQLBoolean,
    resolve: deleteUserSettingResolver,
}

module.exports = deleteUserSetting;