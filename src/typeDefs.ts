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
    createLevel(input: LevelInput!): LevelResponse!
    createCategory(input: CategoryInput!): CategoryResponse!
    createWord(input: WordInput!): WordResponse!
    createUser(input: UserInput!): LoginUserResponse!
    updateWord(wordId: ID!, input: WordInput!):  WordResponse!
    updateCategory(categoryId: ID!, input: CategoryInput!): CategoryResponse!
    updateLevel(levelId: ID!, input: LevelInput!): LevelResponse!
    updateUserLogin(input: UserLoginUpdate!): UserResponse!
    updateUserPassword(input: UserUpdatePasswordInput!): UpdatePasswordResponse!
    setCategoryCompleted(categoryId: ID!): UserResponse!
    setCategoryUncompleted(categoryId: ID!): UserResponse!
    deleteLevel(levelId: ID!): LevelResponse!
    deleteCategory(categoryId: ID!): CategoryResponse!
    deleteWord(wordId: ID!): WordResponse!
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

  input UserLoginUpdate {
    login: String!
    password: String!
  }

  input UserLoginInput {
    login: String!
    password: String!
  }

  input UserUpdatePasswordInput {
    password: String!
    newPassword: String!
    confirmPassword: String!
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

  type LevelResponse implements MutationResponse {
    success: Boolean!
    message: String!
    level: Level
  }

  type CategoryResponse implements MutationResponse {
    success: Boolean!
    message: String!
    category: Category
  }

  type WordResponse implements MutationResponse {
    success: Boolean!
    message: String!
    word: Word
  }

  type UserResponse implements MutationResponse {
    success: Boolean!
    message: String!
    user: User
    token: String
  }

  type UpdatePasswordResponse implements MutationResponse {
    success: Boolean!
    message: String!
  }

  type LoginUserResponse implements MutationResponse {
    success: Boolean!
    message: String!
    user: User
    token: String
  }
`;