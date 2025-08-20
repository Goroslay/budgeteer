import express from 'express'
import indexRouter from './api/routes/index.routes.js'
import { env } from './config/env.js'

const app = express()

app.use(express.json())

app.use(indexRouter)

app.listen(env.port, () => {
  console.log(`Server listen on http://localhost:${env.port}`)
})
