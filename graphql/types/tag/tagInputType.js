const { GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const tagInputType = new GraphQLInputObjectType({
    name: "TagInputType",
    fields: {
        tag_name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }
});

module.exports = tagInputType;