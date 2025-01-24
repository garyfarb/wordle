import mongoose from 'mongoose'
import User from '../models/userSchema.js'
import 'dotenv/config'

const uri = process.env.ATLAS_URI

const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        const uriToPrint = uri.replace(/(?<=\/\/)[^@]+/gm, "uid:pwd")
        console.log(`MongoDB connected at ${uriToPrint}`)
    } catch (err) {
        console.error("MongoDB connection error", err)
    }
}

const populateUsers = async (mockUsers) => {
    try {
        await User.insertMany(mockUsers)
        console.log("Users database populated successfully")
        mongoose.connection.close()
    } catch (err) {
        console.error("Error populating database:", err)
    }
}

export { connectDB, populateUsers }