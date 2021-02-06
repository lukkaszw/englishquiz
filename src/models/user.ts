import { Schema, Types, Document, Model, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface UserInputType {
  login: string
  password: string
  confirmPassword?: string
}

export enum Role { ADMIN = 'ADMIN', USER = 'USER' };

export interface UserValueType {
  _id: string
  login: string
  password: string
  completedCat: Array<string>
  role: Role
}

export interface UserDocument extends Document {
  _id: Types.ObjectId,
  login: string,
  role: string,
  completedCat: Types.Array<string>
  password: string
  generateAuthTokens: () => string
}

interface UserModel extends Model<UserDocument> {
  findByCredentials: (LoginInput: UserInputType) => UserDocument 
}

const UserSchema = new Schema<UserDocument, UserModel>({
  login: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 20,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  completedCat: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  resourceType: {
    type: String,
    default: 'User'
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  },
});

UserSchema.statics.findByCredentials = async (loginData: UserInputType) => {
  const { login, password } = loginData;

  const user:UserDocument = await UserModel.findOne({ login: { $eq: login }});

  const errorMessage = 'Incorrect login or password!';

  if(!user) {
    throw new Error(errorMessage);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    throw new Error(errorMessage);
  }

  return user;
}

UserSchema.methods.generateAuthTokens = function () {
  const user = this;

  const secret = process.env.JWT_SECRET as string;



  console.log('secretKey: ', secret);

  const token = jwt.sign({ _id: user._id.toString() }, secret, { expiresIn: '15m' });

  return token;
}

UserSchema.pre('save', async function (next) {
  const user = this;

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
})

const UserModel = model<UserDocument, UserModel>('User', UserSchema);

export default UserModel;

