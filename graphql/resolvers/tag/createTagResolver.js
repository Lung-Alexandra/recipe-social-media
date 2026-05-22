const db = require('../../../models');

const createTagResolver = async (_, { tag }) => {
    const  {tag_name}  = tag;
    const newTag = await db.Tag.create({
        tag_name,
    });

    console.log('tag aici');
    return newTag;
}

module.exports = createTagResolver;