import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1:27020/englishquiz';

mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
});

export const db = mongoose.connection;