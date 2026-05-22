const {
    GraphQLObjectType,
} = require('graphql');

const addComment = require('./mutations/comment/addComment');
const deleteComment = require('./mutations/comment/deleteComment');
const editComment = require('./mutations/comment/editComment');
const likePost = require('./mutations/like/likePost');
const unlikePost = require('./mutations/like/unlikePost');

const createTag = require('./mutations/tag/createTag');
const updateTag = require('./mutations/tag/updateTag');
const deleteTag = require('./mutations/tag/deleteTag');
const createUser = require('./mutations/user/createUser');
const updateUser = require("./mutations/user/updateUser");
const deleteUser = require("./mutations/user/deleteUser");
const login = require("./mutations/user/login")
const createRecipe = require('./mutations/recipe/createRecipe');
const updateRecipe = require('./mutations/recipe/updateRecipe');
const deleteRecipe = require('./mutations/recipe/deleteRecipe');
const createUserSetting = require('./mutations/user_setting/createUserSetting');
const deleteUserSetting = require('./mutations/user_setting/deleteUserSetting');

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addComment: addComment,
        deleteComment: deleteComment,
        editComment: editComment,
        likePost: likePost,
        unlikePost: unlikePost,
        createTag: createTag,
        updateTag: updateTag,
        deleteTag: deleteTag,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        login: login,
        createRecipe: createRecipe,
        updateRecipe: updateRecipe,
        deleteRecipe: deleteRecipe,
        createUserSetting: createUserSetting,
        deleteUserSetting: deleteUserSetting,

    }
})

module.exports = mutationType;
