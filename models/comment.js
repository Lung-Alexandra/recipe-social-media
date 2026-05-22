'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      models.Comment.belongsTo(models.Recipe, {
        foreignKey: 'recipe_id'
      });
    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    recipe_id: DataTypes.INTEGER,
    comment_text: DataTypes.STRING,
    date_commented: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
