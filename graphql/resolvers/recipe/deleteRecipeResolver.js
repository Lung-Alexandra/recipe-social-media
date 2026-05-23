const db = require('../../../models');

const createRecipeResolver = async (_, args, context) => {
    const { id } = args;
    const targetRecipe = await db.Recipe.findByPk(id);
    try {
        if (!targetRecipe) {
            throw new Error('Recipe not found');
        }

        if (parseInt(targetRecipe.user_id) !== parseInt(context.user_id)) {
            throw new Error('Permission denied');
        }

        await db.Comment.destroy({ where: { recipe_id: id } });
        await db.Like.destroy({ where: { recipe_id: id } });
        await db.RecipeTag.destroy({ where: { recipe_id: id } });
        await targetRecipe.destroy();

        return true;
    } catch (error) {
        throw new Error(`Error deleting recipe: ${error.message}`);
    }
}

module.exports = createRecipeResolver;
