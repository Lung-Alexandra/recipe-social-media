'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const tags = [
      { tag_name: 'Healthy', createdAt: new Date(), updatedAt: new Date() },
      { tag_name: 'Quick', createdAt: new Date(), updatedAt: new Date() },
      { tag_name: 'Vegan', createdAt: new Date(), updatedAt: new Date() },
      { tag_name: 'Dessert', createdAt: new Date(), updatedAt: new Date() },
      { tag_name: 'Breakfast', createdAt: new Date(), updatedAt: new Date() }
    ];

    await queryInterface.bulkInsert('Tags', tags, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
