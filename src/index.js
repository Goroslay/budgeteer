import express from 'express'
import userRouter from './api/routes/user.routes.js'
import { env } from './config/env.js'

const app = express()

app.use(express.json())

app.use('/users', userRouter)

app.listen(env.port, () => {
  console.log(`Server listen on http://localhost:${env.port}`)
})
