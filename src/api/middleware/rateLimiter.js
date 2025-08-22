import rateLimit from 'express-rate-limit'

const windowMs = 15 * 60 * 1000
const limit = 100

export const rateLimiter = rateLimit({
  windowMs,
  limit,
  standardHeaders: true,
  legacyHeaders: false
})
