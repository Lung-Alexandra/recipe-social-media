'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Example: Assuming you have recipe IDs 1-5 and tag IDs 1-5
    const recipeTags = [];

    for (let recipeId = 1; recipeId <= 10; recipeId++) {
      for (let tagId = 1; tagId <= 5; tagId++) {
        recipeTags.push({
          recipe_id: recipeId,
          tag_id: tagId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('RecipeTags', recipeTags, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecipeTags', null, {});
  }
};
