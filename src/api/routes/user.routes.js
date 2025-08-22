import { Router } from 'express'
import { deleteMe, deleteUser, listMe, listUsers, updateMe, updateUser } from '../controllers/user.controller.js'

const userRouter = Router()

// Faltan validaciones con middleware

/*
User routes
PATCH /users/me/password
*/
userRouter.put('/me', updateMe)
userRouter.get('/me', listMe)
userRouter.delete('/me', deleteMe)
// admin routes
userRouter.get('/', listUsers)
userRouter.delete('/:id', deleteUser)
userRouter.put('/:id', updateUser)

export default userRouter
