const TagType = require('../../types/tag/tagType');
const createTagResolver = require('../../resolvers/tag/createTagResolver.js');
const tagInputType = require('../../types/tag/tagInputType');


const createTag = {
    type: TagType,
    args: {
        tag: {
            type: tagInputType,
        }
    },
    resolve: createTagResolver
};

module.exports = createTag;