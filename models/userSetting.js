'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserSetting.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }
  UserSetting.init({
    user_id: DataTypes.INTEGER,
    theme: DataTypes.STRING,
    notifications: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserSetting',
  });
  return UserSetting;
};