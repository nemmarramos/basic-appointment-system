/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
const { default: axios } = require('axios');
const Promise = require('bluebird');
const { User, UserGroup } = require('../../models');

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const createdTestUserDummy = await User.findOrCreate({
        where: { username: 'testuser' },
        defaults: {
          username: 'testuser',
          password: 'password',
          firstName: 'test',
          lastName: 'user',
          email: 'test@user.com',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        transaction,
      });

      const createdTestUserDummyId = createdTestUserDummy[0].dataValues.id;

      await UserGroup.findOrCreate({
        where: {
          groupId: 2,
          userId: createdTestUserDummyId,
        },
        transaction,
      });

      const res = await axios.get(
        'https://random-data-api.com/api/users/random_user?size=100',
      );
      const dummyUsers = res.data;

      await Promise.map(dummyUsers, async (user) => {
        const {
          username, first_name, last_name, email, avatar,
        } = user;

        const createdUserDummy = await User.findOrCreate({
          where: { username },
          defaults: {
            username,
            password: 'password',
            firstName: first_name,
            lastName: last_name,
            email,
            avatar,
          },
          transaction,
        });

        const createdUserId = createdUserDummy[0].dataValues.id;
        await UserGroup.findOrCreate({
          where: {
            groupId: 1,
            userId: createdUserId,
          },
          transaction,
        });
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Groups', null, {});
    await queryInterface.bulkDelete('UserGroups', null, {});
  },
};
