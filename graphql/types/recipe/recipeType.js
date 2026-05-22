const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = require("graphql");
const {
   GraphQLLocalDateTime,
} = require("graphql-scalars")
const db = require("../../../models");
const TagType = require("../tag/tagType");


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
        tags: {
            type: new GraphQLList(TagType),
            async resolve(parent) {
                const recipeTags = await db.RecipeTag.findAll({where: {recipe_id: parent.dataValues.id}});
                const tagIds = recipeTags.map((rt) => rt.tag_id);
                return await db.Tag.findAll({where: {id: tagIds}});
            },
        }
    },
});

module.exports = recipeType;