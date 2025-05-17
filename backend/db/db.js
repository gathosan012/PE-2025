import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL;
    if (!uri)
      throw new Error("❌ MONGO_URL chưa được định nghĩa trong file .env");

    const conn = await mongoose.connect(uri);
    console.log(`✅ Kết nối MongoDB thành công: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Lỗi khi kết nối MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
