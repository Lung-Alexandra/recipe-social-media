'use strict';

const { randText,randNumber } = require('@ngneat/falso');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const fakeComments = [];

    for (let i = 0; i < 10; i++) {
      fakeComments.push({
        user_id: randNumber({ min: 1, max: 10 }),
        recipe_id: randNumber({ min: 1, max: 10 }),
        comment_text: randText({ charCount: 200 }),
        date_commented: randomDate(new Date(2020, 0, 1), new Date()),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Comments', fakeComments, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
