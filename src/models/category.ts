import { Schema, Types, Document, Model, model } from 'mongoose';

export interface CategoryInputType {
  name: string,
  level: Types.ObjectId | string,
}

export interface CategoryValueType {
  _id: string,
  name: string,
  level: string,
}

interface CategoryDocument extends Document, CategoryInputType {}

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
  }
});

const CategoryModel = model<CategoryDocument, CategoryModel>('Category', CategorySchema);

export default CategoryModel;