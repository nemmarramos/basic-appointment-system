const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Appointment.belongsTo(models.User, { foreignKey: 'requestedUserId', as: 'requestedUser' });
    }
  }
  Appointment.init({
    refCode: DataTypes.STRING,
    concern: DataTypes.STRING,
    medicalHistory: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    requestedUserId: DataTypes.INTEGER,
    scheduleDate: DataTypes.DATE,
    scheduleTime: DataTypes.TIME,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Appointment',
  });
  return Appointment;
};
