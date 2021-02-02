import { Schema, Types, Document, Model, model } from 'mongoose';
import bcrypt from 'bcryptjs';

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

interface UserDocument extends Document {
  login: string,
  role: string,
  completedCat: Types.Array<string>
  password: string
}

interface UserModel extends Model<UserDocument> {
  findByCredentials: (LoginInput: UserInputType) => UserValueType 
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

  const user:UserValueType = await UserModel.findOne({ login: { $eq: login }});

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

UserSchema.pre('save', async function (next) {
  const user = this;

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
})

const UserModel = model<UserDocument, UserModel>('User', UserSchema);

export default UserModel;

