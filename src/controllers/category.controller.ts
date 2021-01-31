import CategoryModel, { CategoryValueType } from '../models/category';
import LevelModel from '../models/level';

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

export default {
  getCategories,
  getCategoryLevel,
}