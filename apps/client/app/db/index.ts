import mongoose from 'mongoose';

const uri = process.env.DATABASE_WEBAPP;

if (!uri) {
  throw new Error('DATABASE_WEBAPP is not defined');
}

mongoose.connect(uri);

export { mongoose };
