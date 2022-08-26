import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI_LOCAL);
  console.log("Database connection established");
};

export default connectDB;
