const { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const userSettingInputType = new GraphQLInputObjectType({
    name: "UserSettingInputType",
    fields: {
        theme: {
            type: GraphQLString,
        },
        notifications: {
            type: GraphQLString,
        }
    }
});

module.exports = userSettingInputType;
