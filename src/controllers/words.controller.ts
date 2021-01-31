import WordModel, { WordValueType, WordInputType } from '../models/word';
import CategoryModel from '../models/category';

interface GetWordsArgsInt {
  input: {
    categoryId: string
  }
}

interface CreateWordArgsInt {
  input: WordInputType
}

const getWords = async (rootValue: any, { input }: GetWordsArgsInt) => {
  try {
    const words = await WordModel.find({ category: input.categoryId });
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

const getSentences = (wordValue: WordValueType) => {
  if(!wordValue.sentences || !wordValue.sentences.eng) {
    return null;
  }
  return wordValue.sentences;
}

const createWord = async (rootValue: any, { input }: CreateWordArgsInt) => {

  try {
    const word = new WordModel(input);
    if(word.sentences?.eng.length === 0) {
      word.sentences = null;
    }
    await word.save();
    return {
      success: true,
      message: 'Word successfully created!',
      word
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}


export default {
  getWords,
  getWordCategory,
  createWord,
  getSentences,
}