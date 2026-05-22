'use strict';

const { randText, randSentence, randParagraph,randNumber,randAvatar } = require('@ngneat/falso');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const fakeRecipes = [];

    for (let i = 0; i < 10; i++) {
      fakeRecipes.push({
        user_id: randNumber({ min: 1, max: 10 }),
        title: randText(),
        description: randText(),
        ingredients: randText(100),
        instructions: randText(100),
        imageUrl: randText(),
        dateCreated: randomDate(new Date(2020, 0, 1), new Date()),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Recipes', fakeRecipes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  }
};
