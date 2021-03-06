import { Schema, Types, Document, Model, model } from 'mongoose';
import WordModel from './word';

export interface CategoryInputType {
  name: string,
  level: string,
}

export interface CategoryValueType {
  _id: string,
  name: string,
  level: string,
}



export interface CategoryDocument extends Document {
  name: string,
  level: Types.ObjectId | string,
}

export type CategoriesDocuments  = [CategoryDocument];

interface CategoryModel extends Model<CategoryDocument> {}

const CategorySchema = new Schema<CategoryDocument, CategoryModel>({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Schema.Types.ObjectId,
    ref: 'Level',
    required: true,
  },
  resourceType: {
    type: String,
    default: 'Category',
  }
});

CategorySchema.pre('remove', async function () {
  const category = this;

  await WordModel.deleteMany({ category: category._id });
  
});

const CategoryModel = model<CategoryDocument, CategoryModel>('Category', CategorySchema);

export default CategoryModel;