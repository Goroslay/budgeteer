import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'

export class JWTService {
  constructor (secret = env.jwtSecret, expiresIn = env.jwtExpireIn) {
    this.secret = secret
    this.expiresIn = expiresIn
  }

  generateJWT (userId) {
    return jwt.sign({ userId }, this.secret, { expiresIn: this.expiresIn })
  }

  validateJWT (token) {
    return jwt.verify(token, this.secret)
  }
}
