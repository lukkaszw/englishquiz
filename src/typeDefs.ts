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
    createLevel(input: LevelInput!): CreateLevelResponse!
  }

  interface Resource {
    _id: String!
    resourceType: String!
  }

  interface MutationResponse {
    success: Boolean!
    message: String!
  }

  input LevelInput {
    name: String!
  }

  type Level implements Resource  {
    _id: String!
    name: String!
    categories: [Category]!
    resourceType: String!
  }

  type Category implements Resource {
    _id: String!
    name: String!
    level: Level!
    resourceType: String!
  }

  type CreateLevelResponse implements MutationResponse {
    success: Boolean!
    message: String!
    level: Level
  }  
`;