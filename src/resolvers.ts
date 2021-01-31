import levelsController from './controllers/levels.controller';
import categoriesController from './controllers/category.controller';
import wordController from './controllers/words.controller';

interface Resource {
  resourceType: String,
}

export const resolvers = {
  Query: {
    levels: levelsController.getLevels,
    categories: categoriesController.getCategories,
    words: wordController.getWords,
  },
  Mutation: {
    createLevel: levelsController.createLevel,
    createCategory: categoriesController.createCategory,
  },
  Level: {
    categories: levelsController.getLevelsCategories,
  }, 
  Category: {
    level: categoriesController.getCategoryLevel,
  },
  Word: {
    category: wordController.getWordCategory,
  },
  Resource: {
    __resolveType: (resource: Resource) => resource.resourceType,
  },
  MutationResponse: {
    __resolveType: () => 'MutationResponse',
  }
}