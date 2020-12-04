import { Router } from 'express'
const router = Router()

import { login } from '../controllers/auth/login'
import { signUp } from '../controllers/auth/signup'
import { isDuplicated } from '../middlewares/verifySignUp'

router.post('/login', login);

router.post('/signup', [ isDuplicated ], signUp)

export default router
