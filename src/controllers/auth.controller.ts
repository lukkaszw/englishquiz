import UserModel, { UserDocument } from '../models/user';
import jwt from 'jsonwebtoken';

export interface ContextReqInt {
  user: UserDocument
}

interface TokenPayload {
  _id: string
}

const requireAuthorizedUser = (user: UserDocument) => {
  if(!user) {
    throw new Error('Unauthorized access! Please authenticate!');
  }
}

const requiredAuthorizedAdmin = (user: UserDocument) => {
  if(!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized access!');
  }
}

const authRequest = async (reqAuthToken: string | undefined) => {
  if(!reqAuthToken && !reqAuthToken?.startsWith('Bearer ')) {
    return null;
  }
  const token = reqAuthToken.replace('Bearer ', '');
  try { 
    const secret = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token, secret);

    const { _id } = payload as TokenPayload; 

    const user = await UserModel.findOne({ _id });

    return user;

  } catch (error) {
    console.info(error);
    return null;
  }
}

export default {
  requireAuthorizedUser,
  requiredAuthorizedAdmin,
  authRequest,
}