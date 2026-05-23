'use strict';

// Creation order by dependency:
// Users -> Tags -> Recipes -> UserSettings -> Comments -> Likes -> RecipeTags

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(255),
        unique: true
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true
      },
      password: {
        type: Sequelize.STRING(255)
      },
      profile_picture: {
        type: Sequelize.STRING(255)
      },
      bio: {
        type: Sequelize.TEXT
      },
      date_joined: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
