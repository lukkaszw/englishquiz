const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./typeDefs.ts');
const { resolvers } = require('./resolvers');

const PORT = process.env.PORT || 5000;

const context = ({ req }: any) => ({
  dataAccess: 'dataAccess',
  currentUserId: '1',
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: true,
});


server.listen({ port: PORT}).then(({ url }: any) => {
  console.log(url);
})
