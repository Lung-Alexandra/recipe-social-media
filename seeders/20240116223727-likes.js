'use strict';

const { randNumber } = require('@ngneat/falso');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const fakeLikes = [];

    for (let i = 0; i < 10; i++) {
      fakeLikes.push({
        user_id: i,
        recipe_id: i,
        date_liked: randomDate(new Date(2020, 0, 1), new Date()),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Likes', fakeLikes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Likes', null, {});
  }
};
