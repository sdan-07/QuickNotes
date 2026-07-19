import mongoose from "mongoose";
const uri = 'mongodb://localhost:27017/quicknotes'

export const db_connect = async ():Promise<void> => {
    await mongoose.connect(uri as string);
    console.log("Connected to DB");
    
}