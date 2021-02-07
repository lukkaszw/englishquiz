import UserModel, { UserInputType, UserValueType } from '../models/user';
import CategoryModel from '../models/category';
import auth, { ContextReqInt } from './auth.controller';

export interface UserInputArgsInt {
  input: UserInputType
}

interface UpdatePasswordIntType extends UserInputType {
  newPassword: string
  confirmPassword: string
}

export interface UpdatePasswordArgsInt extends UserInputArgsInt {
  input: UpdatePasswordIntType
}

const login = async (rootValue: any, { input }: UserInputArgsInt) => {
  try {
    const user = await UserModel.findByCredentials(input);

    const token = user.generateAuthTokens();

    return {
      success: true,
      message: 'User successfully logged in!',
      user,
      token,
    }
    
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

const createUser = async (rootValue: any, { input }: UserInputArgsInt ) => {
  try {

    const { login, password, confirmPassword } = input;
    
    if(!login || !password) {
      throw new Error('Please complete registration form correctly!');
    }
    
    if(password !== confirmPassword) {
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

const getCompletedCategories = async (userValue: UserValueType ) => {
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

const updateUserLogin = async (rootValue: any, { input }: UserInputArgsInt, { user }: ContextReqInt ) => {
  try {
    auth.requireAuthorizedUser(user);
    const userObj = await UserModel.findByCredentials({ login: user.login, password: input.password });
    if(!userObj) {
      throw new Error('Incorrect password!');
    }

    userObj.login = input.login;

    await userObj.save();

    return {
      success: true,
      message: 'Login has been correctly updated!',
      user: userObj,
    }

  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}

const updateUserPassword = async (rootValue: any, { input }: UpdatePasswordArgsInt, { user }: ContextReqInt) => {
  try {
    auth.requireAuthorizedUser(user);
    const userObj = await UserModel.findByCredentials({ login: user.login, password: input.password });

    if(input.newPassword !== input.confirmPassword) {
      throw new Error('New passwords must match!');
    }

    userObj.password = input.newPassword;

    await userObj.save();

    return {
      success: true,
      message: 'Password has been updated!',
    }

  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}


export default {
  createUser,
  getCompletedCategories,
  login,
  updateUserLogin,
  updateUserPassword,
}