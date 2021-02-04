import { Schema, Types, Document, Model, model } from 'mongoose';

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

const CategoryModel = model<CategoryDocument, CategoryModel>('Category', CategorySchema);

export default CategoryModel;