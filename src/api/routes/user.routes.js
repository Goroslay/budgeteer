import { Router } from 'express'
import { createUser } from '../controllers/user.controller.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { createUserValidator } from '../validators/userValidator.js'

const userRouter = Router()

userRouter.post('/', createUserValidator, validateRequest, createUser)

export default userRouter
