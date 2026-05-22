const db = require('../../../models');

const deleteUserSettingResolver = async (_, args, context) => {
    const { count, rows } = await db.UserSetting.findAndCountAll({
        where: {
            user_id: context.user_id
        }
    });

    if (count != 1) {
        throw new Error("There is an error with the users' setting.Please check the DB.");
    }

    const target = rows[0];

    if (!target) {
        throw new Error("User setting does't exist");
    }

    try {
        await target.destroy();

        return true;

    } catch {
        throw new Error(`Error deleting user setting of user with id: ${context.user_id}`);
    }
}

module.exports = deleteUserSettingResolver;