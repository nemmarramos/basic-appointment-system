const {
  rule, shield,
} = require('graphql-shield');

const isAuthenticated = rule()(async (parent, args, ctx) => ctx.user !== null);

// Permissions
const permissions = shield({
  Query: {
    doctors: isAuthenticated,
    myAppointments: isAuthenticated,
  },
  Mutation: {
    bookAppointment: isAuthenticated,
    deleteAppointment: isAuthenticated,
  },
});

module.exports = permissions;
