import mongoose from 'mongoose';

const uri = process.env.DATABASE_WEBAPP;

const connectToDatabase = async () => {
  if (!uri) {
    throw new Error('DATABASE_WEBAPP is not defined');
  }
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});

export { mongoose, connectToDatabase };
