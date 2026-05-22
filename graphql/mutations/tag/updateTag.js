const {
    GraphQLNonNull,
    GraphQLID,
} = require('graphql');
const TagType = require('../../types/tag/tagType');
const updateTagResolver = require('../../resolvers/tag/updateTagResolver');
const TagInputType = require('../../types/tag/tagInputType');


const updateTag = {
    type: TagType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        tag: {
            type: TagInputType,
        },
    },
    resolve: updateTagResolver,
}

module.exports = updateTag;