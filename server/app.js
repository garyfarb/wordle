import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/mongodb.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

await connectDB()

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Port: ${process.env.PORT}`)
    console.log(`Server running on http://localhost:${PORT}`)
})

