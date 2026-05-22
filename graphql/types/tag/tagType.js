const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require("graphql");

//this is what the mutation returns
const TagType = new GraphQLObjectType({
    name: "Tag",
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        tag_name: {
            type: GraphQLString,
        },
    }),
});

module.exports = TagType;