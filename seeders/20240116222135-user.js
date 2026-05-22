'use strict';

const { randFirstName, randLastName, randEmail, randPassword, randText, randAvatar, randDate } = require('@ngneat/falso');

module.exports = {
  async up (queryInterface, Sequelize) {
    const fakeUsers = [];

    for (let i = 0; i < 10; i++) {
      fakeUsers.push({
        username: `${randFirstName()}${randLastName()}`,
        email: randEmail(),
        password: randPassword(),
        profile_picture: randAvatar(),
        bio: randText(),
        date_joined: new Date(2020, 0, 1),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
