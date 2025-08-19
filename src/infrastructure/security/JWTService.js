import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { TokenGeneratorPort } from '../../domain/ports/TokenGeneratorPort.js'

export class JWTService extends TokenGeneratorPort {
  constructor (secret = env.jwtSecret, expiresIn = env.jwtExpireIn) {
    super()
    this.secret = secret
    this.expiresIn = expiresIn
  }

  generate (payload) {
    return jwt.sign({ payload }, this.secret, { expiresIn: this.expiresIn })
  }

  validate (token) {
    return jwt.verify(token, this.secret)
  }
}
