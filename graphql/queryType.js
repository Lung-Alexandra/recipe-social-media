const {
    GraphQLObjectType,
} = require('graphql');

const userQuery = require('./queries/user/user');
const tagQuery = require('./queries/tag/tag');
const recipeQuery = require('./queries/recipe/recipe');
const postLikeStatus = require('./queries/like/postLikeStatus');
const getPostComments = require('./queries/comment/getPostComments');
const userSetting = require('./queries/userSetting/userSetting');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        tag: tagQuery,
        user: userQuery,
        recipe:recipeQuery,
        postLikeStatus: postLikeStatus,
        getPostComments: getPostComments,
        userSetting: userSetting,
    }
})

module.exports = queryType;
