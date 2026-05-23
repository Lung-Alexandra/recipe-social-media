const {
    GraphQLObjectType,
} = require('graphql');

const userQuery = require('./queries/user/user');
const tagQuery = require('./queries/tag/tag');
const tagsQuery = require('./queries/tag/tags');
const recipeQuery = require('./queries/recipe/recipe');
const recipeCountQuery = require('./queries/recipe/recipeCount');
const recipesQuery = require('./queries/recipe/recipes');
const userRecipeCountQuery = require('./queries/recipe/userRecipeCount');
const userRecipesQuery = require('./queries/recipe/userRecipes');
const postLikeStatus = require('./queries/like/postLikeStatus');
const getPostComments = require('./queries/comment/getPostComments');
const userSetting = require('./queries/userSetting/userSetting');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        tag: tagQuery,
        tags: tagsQuery,
        user: userQuery,
        recipe:recipeQuery,
        recipeCount: recipeCountQuery,
        recipes: recipesQuery,
        userRecipeCount: userRecipeCountQuery,
        userRecipes: userRecipesQuery,
        postLikeStatus: postLikeStatus,
        getPostComments: getPostComments,
        userSetting: userSetting,
    }
})

module.exports = queryType;
