const {
    GraphQLNonNull,
    GraphQLID,
} = require('graphql');

const RecipeType = require('../../types/recipe/recipeType');
const db = require('../../../models');

const recipeQuery = {
    type: RecipeType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve: async (_, args) => {
        const {id} = args;
        return await db.Recipe.findByPk(id);
    }

}

module.exports = recipeQuery;