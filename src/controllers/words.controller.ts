import WordModel, { WordValueType, WordInputType, WordDocument } from '../models/word';
import CategoryModel from '../models/category';

interface GetWordsArgsInt {
  input: {
    categoryId: string
  }
}

interface CreateWordArgsInt {
  input: WordInputType
}

interface UpdateWordArgsInt extends CreateWordArgsInt {
  wordId: string
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
    const word: WordDocument = new WordModel(input);
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

const updateWord = async (rootValue: any, { wordId, input }: UpdateWordArgsInt) => {

  try {
    const allowedUpdates = ['pl', 'eng', 'sentences', 'category'];
    const dataKeys  = Object.keys(input);
    const isMatch = dataKeys.every(key => allowedUpdates.includes(key));
    if(!isMatch) {
      throw new Error('Provide proper data!');
    }    

    const word = await WordModel.findOne({ _id: wordId });

    if(!word) {
      throw new Error('Word object not found!');
    }

    dataKeys.forEach((key) => {
      if(key === 'eng' || key === 'pl') {
        word[key] = input[key];
      }

      if(key === 'category') {
        word[key] = input[key];
      }

      if(key === 'sentences') {
        word[key] = input[key];
      }
    });

    await word.save();

    return {
      success: true,
      message: 'Word has been successfully updated!',
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
  updateWord,
}