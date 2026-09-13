import mongoose from "mongoose"

export async function connectDb(){
    try{
        const MongoUri = process.env.MONGO_URI;
        if(!MongoUri){
            throw new Error("MongoUri is Required")
        }
        const conn = await mongoose.connect(MongoUri);
        console.log("MongoDb connected 🍀", conn.connection.host);
    }
    catch(error){
        console.error("MongoDb Connection Error",error.message);
        process.exit(1);
    }
}