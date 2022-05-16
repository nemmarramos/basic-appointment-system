module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      refCode: {
        type: Sequelize.STRING,
        unique: true,
      },
      concern: {
        type: Sequelize.STRING,
      },
      medicalHistory: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.INTEGER,
      },
      requestedUserId: {
        type: Sequelize.INTEGER,
      },
      scheduleDate: {
        type: Sequelize.DATEONLY,
      },
      scheduleTime: {
        type: Sequelize.TIME,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments');
  },
};
