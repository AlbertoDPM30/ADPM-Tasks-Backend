import mongoose from "mongoose";
import "dotenv/config";

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_HOST = process.env.MONGO_HOST;

export const ConnectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado con MongoDB");
  } catch (error) {
    console.log(error);
  }
};
