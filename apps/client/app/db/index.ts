import mongoose from 'mongoose';

const uri = process.env.DATABASE_WEBAPP_URI;

if (!uri) {
  throw new Error('DATABASE_WEBAPP_URI is not defined');
}

mongoose.connect(uri);

export { mongoose };
