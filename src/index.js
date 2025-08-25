import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { errorHandler } from './api/middleware/errorHandler.js'
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

// errorHandler
app.use(errorHandler)
app.listen(env.port, () => {
  console.log(`Server listen on http://localhost:${env.port}`)
})
