import mongoose from "mongoose";
mongoose.set("strictQuery", false);

import dotenv from "dotenv";
dotenv.config();

const PASSWORD = encodeURIComponent(process.env.MONGO_PWD);
const MONGO_URL = `mongodb+srv://${process.env.MONGO_UR}:${PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL, {});
        console.log("Connected to DB...");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;