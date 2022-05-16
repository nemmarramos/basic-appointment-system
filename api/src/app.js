const getApolloServer = require('./graphql/server');

const { server } = getApolloServer();

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
