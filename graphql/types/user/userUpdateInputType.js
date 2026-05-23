const { GraphQLInputObjectType, GraphQLString } = require('graphql');

const userUpdateInputType = new GraphQLInputObjectType({
    name: "UserUpdateInputType",
    fields: {
        username: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
        profile_picture: {
            type: GraphQLString,
        },
        bio: {
            type: GraphQLString,
        },
        date_joined: {
            type: GraphQLString,
        }
    }
});

module.exports = userUpdateInputType;
