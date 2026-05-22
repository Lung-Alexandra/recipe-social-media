const db = require('../../../models');

const createUserSettingResolver = async (_, { setting }, context) => {
    const user_id = context.user_id;
    const { theme, notifications } = setting;
    const newUserSetting = await db.UserSetting.create({
        user_id,
        theme,
        notifications,
    });
    return newUserSetting;
}

module.exports = createUserSettingResolver;
