const { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const userInputType = new GraphQLInputObjectType({
    name: "UserInputType",
    fields: {
        username: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
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

module.exports = userInputType;
