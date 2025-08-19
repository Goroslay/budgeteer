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
    const userResponse = await userService.registerUser({
      fullname,
      email,
      username,
      password,
      country
    })
    return res.status(201).json({
      success: true,
      data: userResponse.data,
      token: userResponse.token
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const userResponse = await userService.loginUser({
      username,
      email,
      password
    })
    return res.status(200).json({
      success: true,
      data: userResponse.data,
      token: userResponse.token
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { username, email, country, password, fullname } = req.body
    const user_id = req.params.id
    const userResponse = await userService.updateUser({ user_id, username, email, country, password, fullname })
    return res.status(200).json({
      success: true,
      data: userResponse.data
    })
  } catch (error) {
    next(error)
  }
}

export const listUsers = async (req, res, next) => {
  const { id, fullname, username, email, country, active, take, skip } = req.query || undefined
  const where = {}
  try {
    if (id) where.user_id = id
    if (fullname) where.fullname = fullname
    if (username) where.username = username
    if (email) where.email = email
    if (country) where.country = country
    if (active !== undefined) where.active = active
    const usersResponse = await userService.listUsers({ where, take, skip })
    return res.status(200).json({
      success: true,
      data: usersResponse.data,
      length: usersResponse.length
    })
  } catch (error) {
    next(error)
  }
}
