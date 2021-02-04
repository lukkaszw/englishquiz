import { Schema, Types, Document, Model, model } from 'mongoose';
import CategoryModel, { CategoriesDocuments } from './category';
import WordModel from './word';

export interface LevelInputType {
  name: string,
} 

export interface LevelValueType {
  _id: string,
  name: string,
}

export interface LevelDocument extends Document {
  name: String,
};

interface LevelModel extends Model<LevelDocument> {}

const LevelSchema = new Schema<LevelDocument, LevelModel>({
  name: {
    type: String,
    required: true,
  },
  resourceType: {
    type: String,
    default: 'Level',
  }
});

LevelSchema.pre('remove', async function () {
  const level = this;

  const categories: CategoriesDocuments = await CategoryModel.find({ level: level._id });

  await categories.forEach(async category => {
    await WordModel.deleteMany({ category: category._id });
    await category.remove();
  });
});

const LevelModel = model<LevelDocument, LevelModel>('Level', LevelSchema);

export default LevelModel;


