const db = require('../../../models');

const deleteTagResolver = async (_, args) => {
    const { id } = args;

    const targetTag = await db.Tag.findByPk(id);

    if(!targetTag) {
        return null;
    }

    try {
        await targetTag.destroy();

        return true;
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = deleteTagResolver;