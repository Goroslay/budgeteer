import { Router } from 'express'
import { deleteMe, deleteUser, listMe, listUsers, updateMe, updateUser } from '../controllers/user.controller.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { idValidator, updateUserValidator } from '../validators/userValidator.js'

const userRouter = Router()

// Faltan validaciones con middleware

/*
User routes
PATCH /users/me/password
*/
userRouter.put('/me', updateUserValidator, validateRequest, updateMe)
userRouter.get('/me', listMe)
userRouter.delete('/me', deleteMe)
// admin routes
userRouter.get('/', listUsers)
userRouter.delete('/:id', idValidator, validateRequest, deleteUser)
userRouter.put('/:id', idValidator, updateUserValidator, validateRequest, updateUser)

export default userRouter
