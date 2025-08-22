import mongoose from 'mongoose';
import logger from './logger.js';
import { env } from './index.js';

export const connectDB = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.MONGODB_URI, {
    autoIndex: true
  });
  logger.info('MongoDB connected');
};
