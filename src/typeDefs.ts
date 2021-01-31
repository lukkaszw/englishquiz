const { gql } = require('apollo-server');

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation 
  }

  type Query {
    levels: [Level!]!
    categories: [Category!]!
  }

  type Mutation {
    getName: String
  }

  interface Resource {
    _id: String!
  }

  type Level implements Resource  {
    _id: String!
    name: String!
    categories: [Category]!
  }

  type Category implements Resource {
    _id: String!
    name: String!
    level: Level!
  }
`;