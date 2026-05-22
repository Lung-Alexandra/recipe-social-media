'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const userSettings = [];

    for (let i = 1; i <= 10; i++) {
      userSettings.push({
        user_id: i,
        theme: ['light', 'dark'][Math.floor(Math.random() * 2)], 
        notifications: ['enabled', 'disabled'][Math.floor(Math.random() * 2)], 
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('UserSettings', userSettings, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserSettings', null, {});
  }
};
