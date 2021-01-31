export const resolvers = {
  Query: {
    levels: () => [{ _id: '1', name: 'B1' }],
  },
  Mutation: {
    getName: () => 'Andrew',
  }
}