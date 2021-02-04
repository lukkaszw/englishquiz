import LevelModel, { LevelValueType, LevelInputType, LevelDocument } from '../models/level';
import CategoryModel from '../models/category';
import { resolvers } from '../resolvers';
import { errorMonitor } from 'ws';

interface CreateLevelArgsInt {
  input: LevelInputType,
}

interface LevelIdArgsInt {
  levelId: string,
}

interface UpdateLevelArgsInt extends CreateLevelArgsInt, LevelIdArgsInt {}

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

const updateLevel = async (rootValue: any, { levelId, input }: UpdateLevelArgsInt) => {
  try {

    const allowedUpdates = ['name'];
    const dataKeys  = Object.keys(input);
    const isMatch = dataKeys.every(key => allowedUpdates.includes(key));

    const level: LevelDocument = await LevelModel.findOne({ _id: levelId });

    if(!level) {
      throw new Error('Level object not found!');
    }

    dataKeys.forEach(key => {
      if(key === 'name') {
        level[key] = input[key];
      }
    });

    await level.save();

    return {
      success: true,
      message: 'Level has been successfully updated!',
      level
    }

  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

const deleteLevel = async (rootValue: any, { levelId }:LevelIdArgsInt) => {
  try {
    const level: LevelDocument = await LevelModel.findOne({ _id: levelId });

    if(!level) {
      throw new Error('Level object not found!');
    }

    await level.remove();

    return {
      success: true,
      message: 'Level object has been removed!',
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
  updateLevel,
  deleteLevel,
}