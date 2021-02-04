import CategoryModel, { CategoryValueType, CategoryInputType, CategoryDocument } from '../models/category';
import LevelModel from '../models/level';

interface CreateCategoryArgsInt {
  input: CategoryInputType,
}


interface UpdateCategoryArgsInt extends CreateCategoryArgsInt {
  categoryId: string
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

const updateCategory = async (rootValue: any, { categoryId, input }: UpdateCategoryArgsInt) => {
  try {
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

export default {
  getCategories,
  getCategoryLevel,
  createCategory,
  updateCategory,
}