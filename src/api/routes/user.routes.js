import { Router } from 'express'
import { loginUser, registerUser, updateUser } from '../controllers/user.controller.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { createUserValidator } from '../validators/userValidator.js'

const userRouter = Router()

userRouter.post('/register', createUserValidator, validateRequest, registerUser)
userRouter.post('/login', loginUser)
userRouter.put('/:id', updateUser)

export default userRouter
