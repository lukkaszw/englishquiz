import CategoryModel, { CategoryValueType, CategoryInputType } from '../models/category';
import LevelModel from '../models/level';

interface CreateCategoryArgsInt {
  input: CategoryInputType,
}

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

const createCategory = async (rootValue: any, { input }: CreateCategoryArgsInt) => {
  try {
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

export default {
  getCategories,
  getCategoryLevel,
  createCategory,
}