import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { morganMiddleware } from './api/middleware/morgan.js'
import { rateLimiter } from './api/middleware/rateLimiter.js'
import indexRouter from './api/routes/index.routes.js'
import { env } from './config/env.js'

const app = express()

// Middleware
app.use(morganMiddleware)
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(rateLimiter)

// Routes
app.use(indexRouter)

app.listen(env.port, () => {
  console.log(`Server listen on http://localhost:${env.port}`)
})
