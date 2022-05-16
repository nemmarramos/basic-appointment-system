const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../env');

module.exports = {
  signJWT: (args) => {
    const token = jwt.sign(args, APP_SECRET);
    return token;
  },
  verifyJWT: (jwtString) => {
    try {
      const decoded = jwt.verify(jwtString, APP_SECRET);
      return decoded;
    } catch (error) {
      console.error(error);
      throw new Error('Invalid JWT');
    }
  },
};
