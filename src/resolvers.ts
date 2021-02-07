import levelsController from './controllers/levels.controller';
import categoriesController from './controllers/category.controller';
import wordController from './controllers/words.controller';
import userController from './controllers/user.controller';
import categoryController from './controllers/category.controller';

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
    createWord: wordController.createWord,
    createUser: userController.createUser,

    updateLevel: levelsController.updateLevel,
    updateCategory: categoriesController.updateCategory,
    updateWord: wordController.updateWord,
    updateUserLogin: userController.updateUserLogin,
    updateUserPassword: userController.updateUserPassword,

    deleteLevel: levelsController.deleteLevel,
    deleteCategory: categoryController.deleteCategory,
    deleteWord: wordController.deleteWord,

    setCategoryCompleted: categoryController.setCategoryCompleted,
    setCategoryUncompleted: categoryController.setCategoryUncompleted,
    
    loginUser: userController.login,
  },
  Level: {
    categories: levelsController.getLevelsCategories,
  }, 
  Category: {
    level: categoriesController.getCategoryLevel,
  },
  Word: {
    category: wordController.getWordCategory,
    sentences: wordController.getSentences,
  },
  User: {
    completedCat: userController.getCompletedCategories,
  },
  Resource: {
    __resolveType: (resource: Resource) => resource.resourceType,
  },
  MutationResponse: {
    __resolveType: () => 'MutationResponse',
  }
}