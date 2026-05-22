const {
    GraphQLNonNull,
    GraphQLID,
    GraphQLList
} = require('graphql');


const UserType = require('../../types/user/userType');
const db = require("../../../models");

const userQuery = {
    type: UserType,
    args: {
        user_id: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: (_, args) => {
        const { user_id } = args;
        console.log(user_id)
        return db.User.findByPk(user_id);
    }
}

module.exports = userQuery;