const db = require('../../../models');

const deleteUserResolver = async (_, args, context) => {
    try {
        if (!context?.user_id) {
            throw new Error('Authentication required');
        }

        const { user_id } = args;
        if (parseInt(user_id) !== parseInt(context.user_id)) {
            throw new Error('Permission denied');
        }
        const targetUser = await db.User.findByPk(user_id);

        if (!targetUser) {
            throw new Error('User not found');
        }

        const authoredRecipes = await db.Recipe.findAll({
            attributes: ['id'],
            where: { user_id },
        });
        const authoredRecipeIds = authoredRecipes.map((recipe) => recipe.id);

        await db.Comment.destroy({ where: { user_id } });
        await db.Like.destroy({ where: { user_id } });
        await db.UserSetting.destroy({ where: { user_id } });

        if (authoredRecipeIds.length > 0) {
            await db.Comment.destroy({ where: { recipe_id: authoredRecipeIds } });
            await db.Like.destroy({ where: { recipe_id: authoredRecipeIds } });
            await db.RecipeTag.destroy({ where: { recipe_id: authoredRecipeIds } });
            await db.Recipe.destroy({ where: { id: authoredRecipeIds } });
        }

        await targetUser.destroy();

        return true;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }

}

module.exports = deleteUserResolver;
