import { Router } from 'express'
import authRouter from './auth.route.js'
import userRouter from './user.routes.js'

const indexRouter = Router()

indexRouter.use('/users', userRouter)
indexRouter.use('/auth', authRouter)

export default indexRouter
