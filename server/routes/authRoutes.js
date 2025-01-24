import { Router } from 'express'
import { registerUser, loginUser} from '../controllers/authController.js'

const router = Router()

// sign up
router.post('/register', registerUser)

// login
router.post('/login', loginUser)

export default router