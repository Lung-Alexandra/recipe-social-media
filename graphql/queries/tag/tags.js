const {
    GraphQLList,
} = require('graphql');

const TagType = require('../../types/tag/tagType');
const db = require('../../../models');

const tagsQuery = {
    type: new GraphQLList(TagType),
    resolve: async () => {
        return await db.Tag.findAll({
            order: [['tag_name', 'ASC']],
        });
    },
};

module.exports = tagsQuery;
