import LevelModel, { LevelValueType, LevelInputType } from '../models/level';
import CategoryModel from '../models/category';

interface CreateLevelArgsInt {
  input: LevelInputType,
}

const getLevels = async () => {
  try {
    const levels = await LevelModel.find();
    return levels;
  } catch (error) {
    return error;
  }
}

const getLevelsCategories = async (levelDoc: LevelValueType) => {
  try {
    const categories = await CategoryModel.find({ level: levelDoc._id });
    if(!categories) {
      return [];
    }
    return categories;
  } catch (error) {
    return error;
  }  
}

const createLevel = async (rootValue: any, { input }: CreateLevelArgsInt) => {
  try {
    const level = new LevelModel(input);
    await level.save();
    return {
      success: true,
      message: 'Level successfully created!',
      level
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}


export default {
  getLevels,
  getLevelsCategories,
  createLevel,
}