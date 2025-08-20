import { Router } from 'express'
import { listUsers, updateUser } from '../controllers/user.controller.js'

const userRouter = Router()

/*
    DELETE /users/:id
*/
userRouter.put('/:id', updateUser)
userRouter.get('/', listUsers)

export default userRouter
