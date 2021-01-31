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
    createCategory(input: CategoryInput!): CreateCategoryResponse!
  }

  interface Resource {
    _id: ID!
    resourceType: String!
  }

  interface MutationResponse {
    success: Boolean!
    message: String!
  }

  input LevelInput {
    name: String!
  }

  input CategoryInput {
    name: String!
    level: ID!
  }

  type Level implements Resource  {
    _id: ID!
    name: String!
    categories: [Category]!
    resourceType: String!
  }

  type Category implements Resource {
    _id: ID!
    name: String!
    level: Level!
    resourceType: String!
  }

  type CreateLevelResponse implements MutationResponse {
    success: Boolean!
    message: String!
    level: Level
  }

  type CreateCategoryResponse implements MutationResponse {
    success: Boolean!
    message: String!
    category: Category
  }
`;