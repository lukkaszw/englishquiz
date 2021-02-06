import WordModel, { WordValueType, WordInputType, WordDocument } from '../models/word';
import CategoryModel from '../models/category';
import auth, { ContextReqInt } from './auth.controller';

interface GetWordsArgsInt {
  input: {
    categoryId: string
  }
}

interface CreateWordArgsInt {
  input: WordInputType
}

interface WordIdArgsInt {
  wordId: string
}

interface UpdateWordArgsInt extends CreateWordArgsInt, WordIdArgsInt {}

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

const createWord = async (rootValue: any, { input }: CreateWordArgsInt, { user }: ContextReqInt) => {

  try {
    auth.requiredAuthorizedAdmin(user);
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

const updateWord = async (rootValue: any, { wordId, input }: UpdateWordArgsInt, { user }: ContextReqInt) => {

  try {
    auth.requiredAuthorizedAdmin(user);
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

const deleteWord = async (rootValue: any, { wordId }: WordIdArgsInt, { user }: ContextReqInt) => {
  try {
    auth.requiredAuthorizedAdmin(user);
    const word: WordDocument = await WordModel.findOne({ _id: wordId });

    if(!word) {
      throw new Error('Word object not found!');
    }

    await word.remove();

    return {
      success: true,
      message: 'Word object has been successfully removed!',
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
  deleteWord,
}