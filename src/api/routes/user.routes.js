import { Router } from 'express'
import { deleteMe, deleteUser, listMe, listUsers, updateMe } from '../controllers/user.controller.js'

const userRouter = Router()

// Faltan validaciones con middleware

/*
User routes
 DELETE /users/me

*/
userRouter.put('/me', updateMe)
userRouter.get('/me', listMe)
userRouter.delete('/me', deleteMe)
// admin routes
userRouter.get('/', listUsers)
userRouter.delete('/:id', deleteUser)

export default userRouter
