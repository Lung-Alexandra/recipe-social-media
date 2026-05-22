const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLID,
} = require('graphql');

const UserSettingType = new GraphQLObjectType({
    name: 'UserSetting',
    fields: () => ({
        user_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        theme: {
            type: GraphQLString,
        },
        notifications: {
            type: GraphQLString,
        },
    })
});

module.exports = UserSettingType;
