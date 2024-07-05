import mongoose from "mongoose";
import "dotenv/config";

const connectToDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGODB_URL);
        if (connected) {
            console.log("Connected to DB successfully!");
        }
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

export default connectToDB;
