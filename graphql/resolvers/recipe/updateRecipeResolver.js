const db = require('../../../models');

const updateRecipeResolver = async (_, args,context) => {

    const { id,recipe } = args;
    try {
        const {
            title,
            description,
            ingredients,
            instructions,
            imageUrl,
            dateCreated,
            tags,
        } = recipe;

        const targetRecipe = await db.Recipe.findByPk(id);

        if (!targetRecipe) {
            throw new Error('Recipe not found');
        }

        if (parseInt(targetRecipe.user_id) !== parseInt(context.user_id)) {
            throw new Error('Permission denied');
        }

        if (title !== undefined) targetRecipe.title = title;
        if (description !== undefined) targetRecipe.description = description;
        if (ingredients !== undefined) targetRecipe.ingredients = ingredients;
        if (instructions !== undefined) targetRecipe.instructions = instructions;
        if (imageUrl !== undefined) targetRecipe.imageUrl = imageUrl;
        if (dateCreated !== undefined) targetRecipe.dateCreated = dateCreated;

        await targetRecipe.save();

        if (Array.isArray(tags)) {
            const nextTags = tags.length
                ? await db.Tag.findAll({ where: { tag_name: tags } })
                : [];

            await db.RecipeTag.destroy({ where: { recipe_id: id } });

            if (nextTags.length > 0) {
                await db.RecipeTag.bulkCreate(
                    nextTags.map((tag) => ({
                        recipe_id: id,
                        tag_id: tag.id,
                    }))
                );
            }
        }

        return targetRecipe;
    } catch (error) {
        throw new Error(`Error updating recipe: ${error.message}`);
    }
};

module.exports = updateRecipeResolver;
