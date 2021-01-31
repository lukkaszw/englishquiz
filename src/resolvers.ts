import levelsController from './controllers/levels.controller';
import categoriesController from './controllers/category.controller';

export const resolvers = {
  Query: {
    levels: levelsController.getLevels,
    categories: categoriesController.getCategories,
  },
  Mutation: {
    
  },
  Level: {
    categories: levelsController.getLevelsCategories,
  }, 
  Category: {
    level: categoriesController.getCategoryLevel,
  },
  Resource: {
    __resolveType: () => 'Resource',
  }
}