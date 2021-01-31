import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { db } from './database';

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

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database!');
});

server.listen({ port: PORT}).then(({ url }: any) => {
  console.log(url);
})
