import { Schema, Types, Document, Model, model } from 'mongoose';

export interface WordInputType {
  eng: Array<string>
  pl: Array<string>
  sentences?: {
    eng: Array<string>
    pl: Array<string>
  }
}


export interface WordValueType extends WordInputType {
  _id: string,
  category: string,
}

interface WordDocument extends Document {
  eng: Types.Array<string>
  pl: Types.Array<string>
  sentences: {
    eng: Types.Array<string>
    pl: Types.Array<string>
  }
  category: Types.ObjectId
}

interface WordModel extends Model<WordDocument> {}

const WordSchema = new Schema<WordDocument, WordModel>({
  eng: {
    type: [{
      type: String,
      required: true
    }],
    required: true,
  },
  pl: {
    type: [{
      type: String,
      required: true
    }],
    required: true,
  },
  sentences: {
    eng: [{
      type: String,
      required: true,
    }],
    pl: [{
      type: String,
      required: true,
    }]
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  resourceType: {
    type: String,
    default: 'Word',
  }
});

const WordModel = model<WordDocument, WordModel>('Word', WordSchema);

export default WordModel;