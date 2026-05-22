const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql")
const loginResolver = require('../../resolvers/user/loginResolver')
const LoginResultType = new GraphQLObjectType({
    name: 'LoginResult',
    fields: {
        token: {
            type: GraphQLString,
        }
    }
});

const login = {
    type: LoginResultType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve: loginResolver,
}

module.exports = login