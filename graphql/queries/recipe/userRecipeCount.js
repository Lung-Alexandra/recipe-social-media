const {
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');

const db = require('../../../models');

const userRecipeCountQuery = {
    type: GraphQLInt,
    args: {
        user_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve: async (_, args) => {
        return await db.Recipe.count({
            where: {
                user_id: args.user_id,
            },
        });
    },
};

module.exports = userRecipeCountQuery;
