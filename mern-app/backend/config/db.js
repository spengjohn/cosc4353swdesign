import mongoose from 'mongoose';
const uri = process.env.NODE_ENV === 'test'
  ? process.env.MONGO_URI_TEST
  : process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;