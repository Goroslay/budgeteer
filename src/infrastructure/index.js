import { UserRepositoryPrisma } from './db/UserRepositoryPrisma.js'
import { BcryptService } from './security/BcryptService.js'
import { JWTService } from './security/JWTService.js'

export const jwtService = new JWTService()
export const bcryptService = new BcryptService(10)
export const userRepo = new UserRepositoryPrisma()
