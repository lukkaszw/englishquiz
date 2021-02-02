import UserModel, { UserInputType, USerValueType } from '../models/user';
import CategoryModel from '../models/category';

interface UserInputArgsInt {
  input: UserInputType
}

const createUser = async (rootValue: any, { input }: UserInputArgsInt ) => {
  try {

    const { login, password, confirmPassword } = input;
    
    if(!login || !password) {
      throw new Error('Please complete registration form correctly!');
    }
    
    if(input.password !== input.confirmPassword) {
      throw new Error("Password and confirm password don't match!");
    }

    const user = new UserModel({ ...input, completedCat: []  });

    await user.save();

    return {
      success: true,
      message: 'User account was created successfully!',
      user
    }

  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

const getCompletedCategories = async (userValue: USerValueType ) => {
  try {
    const categories = await CategoryModel.find({
      _id: {
        $in: userValue.completedCat
      }
    });

    return categories;
  } catch (error) {
    return error;
  }
}


export default {
  createUser,
  getCompletedCategories
}