import { UserRepositoryPrisma } from '../../infrastructure/db/UserRepositoryPrisma.js'
import { JWTService } from '../../infrastructure/security/JWTService.js'
import AppError from '../../utils/AppError.js'

const jwtService = new JWTService()
const userRepo = new UserRepositoryPrisma()

export async function isAuth (req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) throw AppError.unauthorized('Missing authorization header')

    const token = authHeader.substring(7)
    const decoded = jwtService.validate(token)
    if (!decoded || !decoded.payload) throw AppError.unauthorized('Invalid token format')

    const { id } = decoded.payload || {}
    if (!id) throw AppError.unauthorized('Token payload missing user id')

    const user = await userRepo.findUserById(id)
    if (!user) throw AppError.unauthorized('User not found')

    req.token = token
    req.user = user.toObjectSafe()
    next()
  } catch (error) {
    next(error)
  }
}

export function isAdmin (req, res, next) {
  try {
    if (req.user?.role !== 'admin') throw AppError.forbidden('Administrator role is required')
    next()
  } catch (error) {
    next(error)
  }
}
