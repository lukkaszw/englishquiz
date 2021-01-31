import LevelModel, { LevelValueType } from '../models/level';
import CategoryModel from '../models/category';

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


export default {
  getLevels,
  getLevelsCategories,
}