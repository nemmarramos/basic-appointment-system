const { ApolloServer } = require('apollo-server');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const models = require('../models');
const { typeDefs, resolvers } = require('.');
const permissions = require('./shield');
const { verifyJWT } = require('../utils/jwt');

const UserAPI = require('../datasources/user');
const AuthAPI = require('../datasources/auth');
const AppointmentAPI = require('../datasources/appointment');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const getApolloServer = (opts) => {
  const userAPI = new UserAPI({ store: models });
  const appointmentAPI = new AppointmentAPI({ store: models });
  const authAPI = new AuthAPI({ store: models });

  const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    dataSources: () => ({
      userAPI,
      appointmentAPI,
      authAPI,
    }),
    csrfPrevention: true,
    playground: true,
    context: (opts && opts.context) || (async (args) => {
      const { req } = args;
      if (req && req.headers.authorization) {
        const [_, token] = req.headers.authorization.split(' ');

        const decoded = verifyJWT(token);
        if (decoded) {
          const user = await models.User.findOne({
            where: {
              id: decoded.sub,
            },
          });
          return {
            user,
          };
        }
      }

      return {
        // mocking that there is no user currently in the context
        user: null,
      };
    }),
  });

  return {
    server,
    userAPI,
    appointmentAPI,
    authAPI,
  };
};

module.exports = getApolloServer;
