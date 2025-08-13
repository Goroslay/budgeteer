import { UserService } from '../../application/services/userServices.js'
import { UserRepositoryPrisma } from '../../infrastructure/db/UserRepositoryPrisma.js'
import { BcryptService } from '../../infrastructure/security/BcryptService.js'
import { JWTService } from '../../infrastructure/security/JWTService.js'

const userRepo = new UserRepositoryPrisma()
const bcryptService = new BcryptService(10)
const jwtService = new JWTService()
const userService = new UserService(userRepo, bcryptService, jwtService)

export const registerUser = async (req, res, next) => {
  try {
    const { fullname, email, username, password, country } = req.body
    const user = await userService.registerUser({
      fullname,
      email,
      username,
      password,
      country
    })
    return res.status(201).json({
      success: true,
      data: user.data,
      token: user.token
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const user = await userService.loginUser({
      username,
      email,
      password
    })
    return res.status(200).json({
      success: true,
      data: user.data,
      token: user.token
    })
  } catch (error) {
    next(error)
  }
}
