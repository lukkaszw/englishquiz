import mongoose from 'mongoose';



const url = process.env.NODE_ENV === 'production' ? 
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.r6yso.mongodb.net/englishquiz?retryWrites=true&w=majority` 
  : 'mongodb://127.0.0.1:27020/englishquiz';

mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
});

export const db = mongoose.connection;