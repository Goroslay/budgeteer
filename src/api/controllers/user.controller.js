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

export const updateMe = async (req, res, next) => {
  try {
    const { username, email, country, fullname } = req.body
    const user = req.user
    const userResponse = await userService.updateMe({ user, username, email, country, fullname })
    return res.status(200).json({
      success: true,
      data: userResponse.data
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { username, email, country, fullname } = req.body
    const { id } = req.params
    const userResponse = await userService.updateUser({ id, username, email, country, fullname })
    return res.status(200).json({
      success: true,
      data: userResponse.data
    })
  } catch (error) {
    next(error)
  }
}

export const listMe = async (req, res, next) => {
  try {
    const user = req.user
    return res.status(200).json({
      data: user
    })
  } catch (error) {
    next(error)
  }
}

export const listUsers = async (req, res, next) => {
  const { id, fullname, username, email, country, active, take, skip } = req.query || undefined
  const where = {}
  if (id) where.user_id = id
  if (fullname) where.fullname = fullname
  if (username) where.username = username
  if (email) where.email = email
  if (country) where.country = country
  if (active !== undefined) where.active = active
  try {
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

export const deleteMe = async (req, res, next) => {
  try {
    const user = req.user
    const userResponse = await userService.deleteMe(user)
    return res.status(200).json({
      success: userResponse.data
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userResponse = await userService.deleteUser(id)
    return res.status(200).json({
      success: userResponse
    })
  } catch (error) {
    next(error)
  }
}

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = req.user
    const id = user.user_id
    const userResponse = await userService.changePassword({ id, oldPassword, newPassword })
    return res.status(200).json({
      success: userResponse.success
    })
  } catch (error) {
    next(error)
  }
}
