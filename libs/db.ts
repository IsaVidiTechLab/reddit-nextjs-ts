import mongoose, { ConnectOptions } from 'mongoose';

const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      useNewUrlParser: true,  
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;