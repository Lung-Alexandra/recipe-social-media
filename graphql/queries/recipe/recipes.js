const {
    GraphQLInt,
    GraphQLList,
    GraphQLString,
} = require('graphql');

const RecipeType = require('../../types/recipe/recipeType');
const db = require('../../../models');
const {
    buildRecipeOrder,
    buildRecipeWhere,
    buildTagInclude,
} = require('./recipeFilters');

const recipesQuery = {
    type: new GraphQLList(RecipeType),
    args: {
        limit: {
            type: GraphQLInt,
        },
        offset: {
            type: GraphQLInt,
        },
        search: {
            type: GraphQLString,
        },
        tag: {
            type: GraphQLString,
        },
        sort: {
            type: GraphQLString,
        },
    },
    resolve: async (_, args) => {
        const limit = Math.min(args.limit || 25, 100);
        const offset = Math.max(args.offset || 0, 0);

        return await db.Recipe.findAll({
            where: buildRecipeWhere(args),
            include: buildTagInclude(args),
            limit,
            offset,
            distinct: true,
            order: buildRecipeOrder(args.sort, args.search),
        });
    },
};

module.exports = recipesQuery;
