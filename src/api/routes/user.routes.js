import { Router } from 'express'
import { changePassword, deleteMe, deleteUser, listMe, listUsers, updateMe, updateUser } from '../controllers/user.controller.js'
import { isAdmin, isAuth } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { changePasswordValidator, idValidator, updateUserValidator } from '../validators/userValidator.js'
const userRouter = Router()

// User routes
userRouter.put('/me', isAuth, updateUserValidator, validateRequest, updateMe)
userRouter.get('/me', isAuth, listMe)
userRouter.delete('/me', isAuth, deleteMe)
userRouter.patch('/me/password', isAuth, changePasswordValidator, validateRequest, changePassword)
// Admin routes
userRouter.get('/', isAuth, isAdmin, listUsers)
userRouter.delete('/:id', isAuth, isAdmin, idValidator, validateRequest, deleteUser)
userRouter.put('/:id', isAuth, isAdmin, idValidator, updateUserValidator, validateRequest, updateUser)

export default userRouter

// añadir caching para evitar sobreconsultas
