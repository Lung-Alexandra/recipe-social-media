const {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const RecipeType = require('../../types/recipe/recipeType');
const db = require('../../../models');

const userRecipesQuery = {
    type: new GraphQLList(RecipeType),
    args: {
        user_id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        limit: {
            type: GraphQLInt,
        },
        offset: {
            type: GraphQLInt,
        },
    },
    resolve: async (_, args) => {
        const limit = Math.min(args.limit || 25, 100);
        const offset = Math.max(args.offset || 0, 0);

        return await db.Recipe.findAll({
            where: {
                user_id: args.user_id,
            },
            limit,
            offset,
            order: [
                ['dateCreated', 'DESC'],
                ['id', 'DESC'],
            ],
        });
    },
};

module.exports = userRecipesQuery;
