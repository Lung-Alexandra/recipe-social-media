const UserSettingType = require('../../types/userSetting/userSettingType');
const createUserSettingResolver = require('../../resolvers/userSetting/createUserSettingResolver');
const userSettingInputType = require('../../types/userSetting/userSettingInputType');

const createUserSetting = {
    type: UserSettingType,
    args: {
        setting: {
            type: userSettingInputType,
        },
    },
    resolve: createUserSettingResolver,
}

module.exports = createUserSetting;