const db = require('../../../models');

const deleteCommentResolver = async (_, { comment }) => {
    const { id } = comment;
    const target = await db.Comment.findByPk(id);

    if (!target) {
        throw new Error("Comment does't exist");
    }

    try {
        await target.destroy();

        return true;

    } catch {
        throw new Error(`Error deleting comment with id: ${id}`);
    }
}

module.exports = deleteCommentResolver;