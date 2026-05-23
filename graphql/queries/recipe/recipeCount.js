const {
    GraphQLInt,
    GraphQLString,
} = require('graphql');

const db = require('../../../models');
const {
    buildRecipeWhere,
    buildTagInclude,
} = require('./recipeFilters');

const recipeCountQuery = {
    type: GraphQLInt,
    args: {
        search: {
            type: GraphQLString,
        },
        tag: {
            type: GraphQLString,
        },
    },
    resolve: async (_, args) => {
        return await db.Recipe.count({
            where: buildRecipeWhere(args),
            include: buildTagInclude(args),
            distinct: true,
            col: 'id',
        });
    },
};

module.exports = recipeCountQuery;
