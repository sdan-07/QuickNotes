import mongoose from "mongoose";

export const db_connect = async ():Promise<void> => {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to DB");
    
}