import { CreateUserService } from '../../application/services/CreateUserService.js'
import { UserRepositoryPrisma } from '../../infrastructure/db/UserRepositoryPrisma.js'
import { BcryptService } from '../../infrastructure/security/BcryptService.js'

const userRepo = new UserRepositoryPrisma()
const bcryptService = new BcryptService(10)
const createUserService = new CreateUserService(userRepo, bcryptService)

export const createUser = async (req, res, next) => {
  try {
    const { fullname, email, username, password, country } = req.body
    const user = await createUserService.execute({
      fullname,
      email,
      username,
      password,
      country
    })
    return res.status(201).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}
