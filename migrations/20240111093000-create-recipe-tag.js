'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RecipeTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey:true,
        references: {
          model: 'Recipes',
          key: 'id',
        },
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey:true,
        references: {
          model: 'Tags',
          key: 'id',
        },
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
    await queryInterface.dropTable('RecipeTags');
  }
};
