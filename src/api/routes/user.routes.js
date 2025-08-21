import { Router } from 'express'
import { listMe, listUsers, updateMe } from '../controllers/user.controller.js'

const userRouter = Router()

/*
User routes
 DELETE /users/me

*/
userRouter.put('/me', updateMe)
userRouter.get('/me', listMe)
// admin routes
userRouter.get('/', listUsers)

export default userRouter
