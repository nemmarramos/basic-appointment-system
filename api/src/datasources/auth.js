const argon2 = require('argon2');
const { DataSource } = require('apollo-datasource');
const { signJWT } = require('../utils/jwt');

const INVALID_AUTH_RES = {
  success: false,
  message: 'Invalid username or password',
};

class AuthAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async login({ username, password }) {
    try {
      const user = await this.store.User.findOne({
        where: {
          username,
        },
        raw: true,
      });

      if (!user) {
        return INVALID_AUTH_RES;
      }

      const isPasswordMatched = await argon2.verify(user.password, password);

      if (!isPasswordMatched) {
        return INVALID_AUTH_RES;
      }

      return {
        success: true,
        data: {
          token: signJWT({
            sub: user.id,
          }),
          user,
        },
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return {
        success: false,
        data: 'Server error',
      };
    }
  }
}

module.exports = AuthAPI;
