const db = require('../../../models');

const createTagResolver = async (_, { tag }) => {
    const tagName = tag?.tag_name?.trim();

    if (!tagName) {
        throw new Error('Tag name is required');
    }

    const existingTag = await db.Tag.findOne({
        where: db.Sequelize.where(
            db.Sequelize.fn('lower', db.Sequelize.col('tag_name')),
            tagName.toLowerCase()
        ),
    });

    if (existingTag) return existingTag;

    return await db.Tag.create({
        tag_name: tagName,
    });
}

module.exports = createTagResolver;
