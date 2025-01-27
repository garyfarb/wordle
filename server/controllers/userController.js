import User from '../models/userSchema.js'
import bcrypt from 'bcrypt'

const getUserProfile = async (req, res) => {
    const { email } = req.params
    console.log(email)

    try {
        const user = await User.findOne({ email })
        console.log(user)

        if (!user) {
            return res.status(404).json({
                error: "User does not exist"
            })
        }
        res.status(200).json({
            message: "User found",
            user: user
        })
    } catch(err) {
        res.status(500).json({
            error: "Unable to fetch user profile",
        })
    }
}

const updateUserProfile = async (req, res) => {
    const { email } = req.params
    const { username, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                error: "User does not exist"
            })
        }
        
        if (username) {
            user.username = username
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword
        }

        await user.save()
        res.status(200).json({
            message: "User profile updated succsesfully",
            user: user
        })

    } catch(err) {
        res.status(500).json({
            error: "Unable to update user"
        })
    }
}

const updateUserStats = async (req, res) => {
    const { email } = req.params
    const { isWon, guessIndex } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                error: "User does not exist"
            })
        }

        if (isWon) {
            user.statistics.gamesWon++
            
            if (guessIndex >= 0 && guessIndex < user.statistics.guessDistribution.length) {
                user.statistics.guessDistribution[guessIndex]++;
            }
            else {
                return res.status(400).json({
                  error: 'Invalid guess index',
                });
            }
        }

        user.statistics.gamesPlayed++

        const updatedUser = await user.save()

        res.status(200).json({
            message: "User stats updated",
            user: updatedUser
        })
    } catch(err) {
        res.status(500).json({
            error: "Unable to update user statistics"
        })
        console.error("Error updating stats: ", err)
    }
}

export { getUserProfile, updateUserProfile, updateUserStats}