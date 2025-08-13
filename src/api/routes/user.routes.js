import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/user.controller.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { createUserValidator } from '../validators/userValidator.js'

const userRouter = Router()

userRouter.post('/register', createUserValidator, validateRequest, registerUser)
userRouter.post('/login', loginUser)

export default userRouter
