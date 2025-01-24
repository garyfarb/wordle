import User from '../models/userSchema.js'
import bcrypt from 'bcrypt'

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                error: "Email already in use"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ 
            username,
            email,
            password: hashedPassword ,
            statistics: {
                gamesPlayed: 0,
                gamesWon: 0,
                guessDistribution: []
            }
        })
        await newUser.save()

        res.status(201).json({
            message: "User registered successfully"
        })
    } catch (err) {
        res.status(500).json({
            error: "Failed to register user"
        })
    }
}

// Log in existing user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                error: "User does not exist"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Incorrect password"
            })
        }

        res.status(200).json({
            message: "User signed in successfully"
        })
    } catch (err) {
        res.status(500).json({ 
            error: "Failed to log user in"
        })
    }
}

export { registerUser, loginUser }