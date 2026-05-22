const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLID,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        user_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
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
    })
});

module.exports = UserType;
