const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getPaginatedDoctors({ page, pageSize = 12 }) {
    const list = await this.store.User.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      where: {
        '$groups.code$': 'DOCTOR',
      },
      include: [{
        model: this.store.Group,
        as: 'groups',
      }],
      raw: true,
      subQuery: false,
    });

    return {
      page,
      pageSize,
      ...list,
    };
  }
}

module.exports = UserAPI;
