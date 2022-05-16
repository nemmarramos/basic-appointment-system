module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkDelete('Groups', null, {});
    await queryInterface.bulkInsert('Groups', [{
      id: 1,
      code: 'DOCTOR',
      name: 'Doctor',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      code: 'PATIENT',
      name: 'Patient',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Groups', null, {});
  },
};
