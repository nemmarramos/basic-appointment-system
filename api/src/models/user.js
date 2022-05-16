const {
  Model,
} = require('sequelize');

const argon2 = require('argon2');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.belongsToMany(models.Group, { through: 'UserGroups', as: 'groups' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    indexes: [{
      unique: true,
      fields: ['username'],
    }, {
      unique: true,
      fields: ['email'],
    }],
  });
  User.beforeSave(async (user) => {
    const hashedPassword = await argon2.hash(user.password);
    // eslint-disable-next-line no-param-reassign
    user.password = hashedPassword;
  });
  return User;
};
