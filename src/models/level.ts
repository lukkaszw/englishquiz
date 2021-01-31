import { Schema, Types, Document, Model, model } from 'mongoose';

export interface LevelInputType {
  name: string,
} 

export interface LevelValueType {
  _id: string,
  name: string,
}

interface LevelDocument extends Document, LevelInputType {};

interface LevelModel extends Model<LevelDocument> {}

const LevelSchema = new Schema<LevelDocument, LevelModel>({
  name: {
    type: String,
    required: true,
  },
});

const LevelModel = model<LevelDocument, LevelModel>('Level', LevelSchema);

export default LevelModel;


