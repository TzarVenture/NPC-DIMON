import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected", connectionInstance.connection.host)
    } catch (error) {
        console.log("some error has occured", error)
        process.exit(1)
    }
}

export default connectDB;