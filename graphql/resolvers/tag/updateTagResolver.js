const db = require('../../../models');

const updateTagResolver = async (_, args) => {
    const { id, tag } = args;

    const targetTag = await db.Tag.findByPk(id);

    if(!targetTag) {
        return null;
    }

    return await targetTag.update({
        ...tag,
    });
}

module.exports = updateTagResolver;