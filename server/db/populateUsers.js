import { connectDB, populateUsers } from "../modules/mongodb.js";
import mockUsers from "./mockUsers.js";

try {
    connectDB()
    await populateUsers(mockUsers)
    console.log("Database populated")
} catch {
    console.error("Failure populating database", err)
}
