import levelsController from './controllers/levels.controller';
import categoriesController from './controllers/category.controller';

interface Resource {
  resourceType: String,
}

export const resolvers = {
  Query: {
    levels: levelsController.getLevels,
    categories: categoriesController.getCategories,
  },
  Mutation: {
    createLevel: levelsController.createLevel,
  },
  Level: {
    categories: levelsController.getLevelsCategories,
  }, 
  Category: {
    level: categoriesController.getCategoryLevel,
  },
  Resource: {
    __resolveType: (resource: Resource) => resource.resourceType,
  },
  MutationResponse: {
    __resolveType: () => 'MutationResponse',
  }
}