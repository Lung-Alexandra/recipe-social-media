const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
} = require("graphql");
const {
   GraphQLLocalDateTime,
} = require("graphql-scalars")
const db = require("../../../models");
const TagType = require("../tag/tagType");
const UserType = require("../user/userType");


//this is what the mutation returns
const recipeType = new GraphQLObjectType({
    name: "recipe",
    fields: {
        id: {
            type: GraphQLID,
        },
        user_id: {
            type: GraphQLID,
        },
        title: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        ingredients: {
            type: GraphQLString,
        },
        instructions: {
            type: GraphQLString,
        },
        imageUrl: {
            type: GraphQLString,
        },
        dateCreated: {
            type: GraphQLString,
        },
        author: {
            type: UserType,
            async resolve(parent) {
                return await db.User.findByPk(parent.user_id);
            },
        },
        likeCount: {
            type: GraphQLInt,
            async resolve(parent) {
                return await db.Like.count({ where: { recipe_id: parent.id } });
            },
        },
        commentCount: {
            type: GraphQLInt,
            async resolve(parent) {
                return await db.Comment.count({ where: { recipe_id: parent.id } });
            },
        },
        userLiked: {
            type: GraphQLBoolean,
            async resolve(parent, _, context) {
                if (!context?.user_id) return false;

                const count = await db.Like.count({
                    where: {
                        recipe_id: parent.id,
                        user_id: context.user_id,
                    },
                });

                return count > 0;
            },
        },
        tags: {
            type: new GraphQLList(TagType),
            async resolve(parent) {
                const recipeTags = await db.RecipeTag.findAll({where: {recipe_id: parent.id}});
                const tagIds = recipeTags.map((rt) => rt.tag_id);
                return await db.Tag.findAll({where: {id: tagIds}});
            },
        }
    },
});

module.exports = recipeType;
