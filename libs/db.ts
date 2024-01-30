import mongoose, { ConnectOptions } from "mongoose"

const connectMongoDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI || "", { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        } as ConnectOptions)
        console.log("MongoDB connected")
        } catch (err) {
            console.log(err)
        }


}

export default connectMongoDB