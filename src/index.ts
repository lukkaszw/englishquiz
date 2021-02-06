import { ApolloServer } from 'apollo-server';
import { Request, Response } from 'express';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { db } from './database';
import auth from './controllers/auth.controller';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

interface ContextRequest {
  req: Request
  res: Response
}

const context = async ({ req }: ContextRequest) => ({
  user: await auth.authRequest(req.headers.authorization),
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
