import WordModel, { WordValueType } from '../models/word';
import CategoryModel from '../models/category';

interface GetCategoryWordsArgsInt {
  input: {
    categoryId: string
  }
}

const getWords = async (rootValue: any, { input }: GetCategoryWordsArgsInt) => {
  try {
    const words = await WordModel.find({ category: input.categoryId });
    console.log(words);
    return words;
  } catch (error) {
    return error;
  }
}

const getWordCategory = async (wordValue: WordValueType) => {
  try {
    const category = await CategoryModel.findOne({ _id: wordValue.category });
    return category;
  } catch (error) {
    return error;
  }
}

export default {
  getWords,
  getWordCategory,
}