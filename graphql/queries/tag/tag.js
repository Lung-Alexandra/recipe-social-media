const {
    GraphQLNonNull,
    GraphQLID,
} = require('graphql');

const TagType = require('../../types/tag/tagType');
const db = require('../../../models');

const tagQuery = {
    type: TagType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: (_, args) => {
        const { id } = args;
        return db.Tag.findByPk(id);
    }

}

module.exports = tagQuery;