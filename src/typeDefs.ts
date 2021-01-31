const { gql } = require('apollo-server');

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation 
  }

  type Query {
    levels: [Level!]!
    categories: [Category!]!
    words(input: GetWordsInput!): [Word!]!
  }

  type Mutation {
    createLevel(input: LevelInput!): CreateLevelResponse!
    createCategory(input: CategoryInput!): CreateCategoryResponse!
    createWord(input: WordInput!): CreateWordResponse!
  }

  interface Resource {
    _id: ID!
    resourceType: String!
  }

  interface MutationResponse {
    success: Boolean!
    message: String!
  }

  input GetWordsInput {
    categoryId: String!
  }

  input SentencesInput {
    eng: [String]
    pl: [String]
  }

  input WordInput {
    eng: [String!]!
    pl: [String!]!
    category: ID!
    sentences: SentencesInput
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

  type Sentences {
    eng: [String]
    pl: [String]
  }

  type Word implements Resource {
    _id: ID!
    resourceType: String!
    eng: [String!]!,
    pl: [String!]!,
    sentences: Sentences
    category: Category!
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

  type CreateWordResponse implements MutationResponse {
    success: Boolean!
    message: String!
    word: Word
  }
`;