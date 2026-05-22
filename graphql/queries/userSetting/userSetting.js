const {
    GraphQLNonNull,
    GraphQLID,
} = require('graphql');


const UserSettingType = require('../../types/userSetting/userSettingType');
const db = require("../../../models");

const userSettingQuery = {
    type: UserSettingType,
    resolve: async (_, args, context) => {
        const { count, rows } = await db.UserSetting.findAndCountAll({
            where: {
                user_id: context.user_id
            }
        });

        if(count != 1) {
            throw new Error(`There is an error with the users' setting, id: ${context.user_id}`)
        }

        return rows[0];
    }
}

module.exports = userSettingQuery;