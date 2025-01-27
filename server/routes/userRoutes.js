import { Router } from 'express'
import { getUserProfile, updateUserProfile, updateUserStats } from '../controllers/userController.js'

const router = Router()

router.get('/:email', getUserProfile)
router.patch('/:email/profile', updateUserProfile)
router.patch('/:email/stats', updateUserStats)

export default router