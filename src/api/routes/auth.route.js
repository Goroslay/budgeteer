import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/user.controller.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { createUserValidator } from '../validators/userValidator.js'

const authRouter = Router()

// Faltan validaciones con middleware

authRouter.post('/register', createUserValidator, validateRequest, registerUser)
authRouter.post('/login', loginUser)
/*
/auth/refresh
/auth/logout
/auth/password/forgot
/auth/password/reset
/auth/email/verify/request
/auth/email/verify/confirm
/auth/mfa/setup
/auth/mfa/verify
/auth/sessions
/auth/sessions/:sessionId
*/

export default authRouter
