const {
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean
} = require('graphql');
const updateRecipeResolver = require('../../resolvers/recipe/updateRecipeResolver.js');
const recipeType = require('../../types/recipe/recipeType.js');
const recipeInputType = require('../../types/recipe/recipeInputType');


const updateRecipe = {
    type: recipeType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        recipe: {
            type: recipeInputType,
        }
    },
    resolve: updateRecipeResolver
};

module.exports = updateRecipe;