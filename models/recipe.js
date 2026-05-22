'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Recipe.belongsTo(models.User, {
        foreignKey: 'id'
      });
      models.Recipe.belongsToMany(models.Tag, {
        through: 'RecipeTag',
        foreignKey: 'recipe_id'
      });
    }
  }
  Recipe.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    ingredients: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    dateCreated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};