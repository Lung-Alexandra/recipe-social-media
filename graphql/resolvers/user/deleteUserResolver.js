const db = require('../../../models');

const deleteUserResolver = async (_, args, context) => {
    try {
        const { user_id } = args;
        if (parseInt(user_id) !== parseInt(context.user_id)) {
            throw new Error('Permission denied');
        }
        const targetUser = await db.User.findByPk(user_id);

        if (!targetUser) {
            throw new Error('User not found');
        }


        await targetUser.destroy();

        return true;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }

}

module.exports = deleteUserResolver;
