import { Router } from 'express'
import { changePassword, deleteMe, deleteUser, listMe, listUsers, updateMe, updateUser } from '../controllers/user.controller.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { changePasswordValidator, idValidator, updateUserValidator } from '../validators/userValidator.js'

const userRouter = Router()

// User routes
userRouter.put('/me', updateUserValidator, validateRequest, updateMe)
userRouter.get('/me', listMe)
userRouter.delete('/me', deleteMe)
userRouter.patch('/me/password', changePasswordValidator, validateRequest, changePassword)
// Admin routes
userRouter.get('/', listUsers)
userRouter.delete('/:id', idValidator, validateRequest, deleteUser)
userRouter.put('/:id', idValidator, updateUserValidator, validateRequest, updateUser)

export default userRouter
