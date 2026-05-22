const {
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean
} = require('graphql');
const deleteRecipeResolver = require('../../resolvers/recipe/deleteRecipeResolver.js');

const deleteRecipe = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: deleteRecipeResolver
};

module.exports = deleteRecipe;