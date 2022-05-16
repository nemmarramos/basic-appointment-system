/* eslint-disable max-len */
const resolvers = {
  Query: {
    doctors: (_, args, { dataSources }) => dataSources.userAPI.getPaginatedDoctors(args),
    myAppointments: (_, args, { dataSources, ...ctx }) => dataSources.appointmentAPI.myAppointments(args, ctx),
  },
  Mutation: {
    login: (_, args, { dataSources }) => dataSources.authAPI.login(args),
    bookAppointment: (_, args, { dataSources, ...ctx }) => dataSources.appointmentAPI.create(args.input, ctx),
    deleteAppointment: (_, args, { dataSources }) => dataSources.appointmentAPI.delete(args.id),
  },
};

module.exports = {
  resolvers,
};
