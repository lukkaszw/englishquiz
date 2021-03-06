import CategoryModel, { CategoryValueType, CategoryInputType, CategoryDocument } from '../models/category';
import LevelModel from '../models/level';
import auth, { ContextReqInt } from './auth.controller';

interface CreateCategoryArgsInt {
  input: CategoryInputType,
}


interface CategoryIdArgsInt {
  categoryId: string,
}

interface UpdateCategoryArgsInt extends CreateCategoryArgsInt, CategoryIdArgsInt {}

const getCategories = async () => {
  try {
    const categories = await CategoryModel.find();
    return categories;
  } catch (error) {
    return error;
  }
}

const getCategoryLevel = async (categoryValue: CategoryValueType) => {
  try {
    const level = await LevelModel.findOne({ _id: categoryValue.level });
    return level;
  } catch (error) {
    return error;
  }
}

const createCategory = async (rootValue: any, { input }: CreateCategoryArgsInt, { user }: ContextReqInt) => {
  try {
    auth.requiredAuthorizedAdmin(user);
    const category = new CategoryModel(input);
    await category.save();
    return {
      success: true,
      message: 'Category successfully created!',
      category: category,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

const updateCategory = async (rootValue: any, { categoryId, input }: UpdateCategoryArgsInt,  { user }: ContextReqInt) => {
  try {
    auth.requiredAuthorizedAdmin(user);
    const allowedUpdates = ['name', 'level'];
    const dataKeys  = Object.keys(input);
    const isMatch = dataKeys.every(key => allowedUpdates.includes(key));

    if(!isMatch) {
      throw new Error('Provide proper data!');
    }

    const category: CategoryDocument = await CategoryModel.findOne({ _id: categoryId });

    if(!category) {
      throw new Error('Category object not found!')
    }

    dataKeys.forEach(key => {
      if(key === 'name' || key === 'level') {
        category[key] = input[key];
      }
    });

    await category.save();

    return {
      success: true,
      message: 'Category has been successfully updated!',
      category
    }

  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

const deleteCategory = async (rootValue: any, { categoryId }: CategoryIdArgsInt, { user }: ContextReqInt) => {
  try {
    auth.requiredAuthorizedAdmin(user);
    const category: CategoryDocument = await CategoryModel.findOne({ _id: categoryId });

    if(!category) {
      throw new Error('Category object not found!');
    }

    await category.remove();

    return {
      success: true,
      message: 'Category has been successfully removed!',
      category,
    }

  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

const setCategoryCompleted = async (rootValue: any, { categoryId }: CategoryIdArgsInt, { user }: ContextReqInt) => {
  try {
    auth.requireAuthorizedUser(user);
    const category = await CategoryModel.findOne({ _id: categoryId });
    if(!category) {
      throw new Error('Category not found!');
    }

    if(!user.completedCat.includes(categoryId)) {
      user.completedCat.push(categoryId);
      await user.save();
    }


    return {
      success: true,
      message: 'Category set as completed correctly!',
      user,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

const setCategoryUncompleted = async (rootValue: any, { categoryId }: CategoryIdArgsInt, { user }: ContextReqInt) => {
  try {
    auth.requireAuthorizedUser(user);
    const category = await CategoryModel.findOne({ _id: categoryId });
    if(!category) {
      throw new Error('Category not found!');
    }

    if(user.completedCat.includes(categoryId)) {
      user.completedCat.pull(categoryId);
      await user.save();
    }


    return {
      success: true,
      message: 'Category set as uncompleted correctly!',
      user,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export default {
  getCategories,
  getCategoryLevel,
  createCategory,
  updateCategory,
  deleteCategory,
  setCategoryCompleted,
  setCategoryUncompleted,
}