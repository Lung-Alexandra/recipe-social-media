const RecipeType = require('../../types/recipe/recipeType');
const createRecipeResolver = require('../../resolvers/recipe/createRecipeResolver.js');
const recipeInputType = require('../../types/recipe/recipeInputType');


const createRecipe = {
    type: RecipeType,
    args: {
        recipe: {
            type: recipeInputType,
        }
    },
    resolve: createRecipeResolver
};

module.exports = createRecipe;