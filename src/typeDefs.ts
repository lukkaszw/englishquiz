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
    createWord(input: WordInput!): WordResponse!
    createUser(input: UserInput!): CreateUserResponse!
    updateWord(wordId: ID!, input: WordInput!):  WordResponse!
    loginUser(input: UserLoginInput!): LoginUserResponse!
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

  input UserInput {
    login: String!
    password: String!
    confirmPassword: String!
  }

  input UserLoginInput {
    login: String!
    password: String!
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
    eng: [String!]!
    pl: [String!]!
    sentences: Sentences
    category: Category!
  }

  type User implements Resource {
    _id: ID!
    resourceType: String!
    login: String!
    completedCat: [Category]!
    role: String!
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

  type WordResponse implements MutationResponse {
    success: Boolean!
    message: String!
    word: Word
  }

  type CreateUserResponse implements MutationResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type LoginUserResponse implements MutationResponse {
    success: Boolean!
    message: String!
    user: User
    token: String
  }
`;