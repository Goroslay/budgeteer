import { User } from '../../domain/entities/User.js'
import AppError from '../../utils/AppError.js'
import { ListUserDTO, LoginUserDTO, RegisterUserDTO, UpdateMeDTO, UpdateUserDTO } from '../dto/userDTO.js'
export class UserService {
  constructor (userRespository, passwordHasher, tokenGenerator) {
    this.userRespository = userRespository
    this.passwordHasher = passwordHasher
    this.tokenGenerator = tokenGenerator
  }

  async registerUser (registerUserRequest) {
    const registerUserDTO = new RegisterUserDTO(registerUserRequest)
    const userData = registerUserDTO.toDomain()
    const { email, username, fullname, password, country } = userData
    const [byEmail, byUsername] = await Promise.all([
      this.userRespository.findUserByEmail(email),
      this.userRespository.findUserByUsername(username)
    ])
    if (byEmail) throw AppError.conflict('Email duplicated')
    if (byUsername) throw AppError.conflict('Username duplicated')

    const passwordHash = await this.passwordHasher.hash(password)
    const newUser = User.create({
      fullname,
      email,
      username,
      passwordHash,
      country
    })

    const savedUser = await this.userRespository.createUser(newUser)
    const token = this.tokenGenerator.generate({ id: savedUser.user_id, role: savedUser.role })

    return {
      data: savedUser.toObjectSafe(),
      token
    }
  }

  async loginUser (loginUserRequest) {
    const loginUserDTO = new LoginUserDTO(loginUserRequest)
    const userData = loginUserDTO.toDomain()
    const { username, email, password } = userData
    const user = username ? await this.userRespository.findUserByUsername(username) : await this.userRespository.findUserByEmail(email)
    if (!user) throw AppError.unauthorized('Invalid credentials')

    const isValidPassword = await this.passwordHasher.compare(password, user._passwordHash)
    if (!isValidPassword) throw AppError.unauthorized('Invalid credentials')

    const token = this.tokenGenerator.generate({ id: user.user_id, role: user.role })

    return {
      data: user.toObjectSafe(),
      token
    }
  }

  async updateMe (updateMeRequest) {
    const updateMeDTO = new UpdateMeDTO(updateMeRequest)
    const { user, username, fullname, country, email } = updateMeDTO.toDomain()
    const id = user.user_id
    if (username) {
      const byUsername = await this.userRespository.findUserByUsername(username)
      if (byUsername && byUsername.user_id !== id) throw AppError.conflict('Username duplicated')
    }
    if (email) {
      const byEmail = await this.userRespository.findUserByEmail(email)
      if (byEmail && byEmail.user_id !== id) throw AppError.conflict('Email duplicated')
    }
    const updatedUser = await this.userRespository.updateUser(id, { username, fullname, country, email })
    return {
      data: updatedUser.toObjectSafe()
    }
  }

  async updateUser (updateUserRequest) {
    const updateUserDTO = new UpdateUserDTO(updateUserRequest)
    const { id, username, email, fullname, country } = updateUserDTO.toDomain()
    const userToUpdate = await this.userRespository.findUserById(id)
    if (!userToUpdate) throw AppError.notFound('Invalid user')
    if (username) {
      const byUsername = await this.userRespository.findUserByUsername(username)
      if (byUsername && byUsername.user_id !== id) throw AppError.conflict('Username duplicated')
    }
    if (email) {
      const byEmail = await this.userRespository.findUserByEmail(email)
      if (byEmail && byEmail.user_id !== id) throw AppError.conflict('Email duplicated')
    }
    const updateUser = await this.userRespository.updateUser(id, { username, fullname, country, email })
    return {
      data: updateUser.toObjectSafe()
    }
  }

  async listUsers (listUsersRequest = {}) {
    const listQuery = { ...listUsersRequest.where, take: listUsersRequest.take, skip: listUsersRequest.skip }
    const listUserDTO = ListUserDTO.fromQuery(listQuery)
    if (listUserDTO.user_id) {
      const userFind = await this.userRespository.findUserById(listUserDTO.user_id)
      return userFind
        ? {
            data: userFind.toObjectSafe(),
            length: 1
          }
        : {
            data: [],
            length: 0
          }
    }
    const filters = listUserDTO.toDomain()
    const usersFind = await this.userRespository.list(filters)
    return {
      length: usersFind.length,
      data: usersFind.map(user => user.toObjectSafe())
    }
  }

  async deleteMe (user) {
    const id = user.user_id
    return await this.userRespository.deleteUser(id)
  }

  async deleteUser (id) {
    const userToDelete = await this.userRespository.findUserById(id)
    if (!userToDelete) throw AppError.notFound('Invalid User')
    return await this.userRespository.deleteUser(id)
  }

  async changePassword (changePasswordRequest) {
    const { id, oldPassword, newPassword } = changePasswordRequest
    const user = await this.userRespository.findUserById(id)
    const isSamePassword = await this.passwordHasher.compare(oldPassword, user._passwordHash)
    if (isSamePassword) throw AppError.conflict('The password must be different')
    const newPasswordHash = await this.passwordHasher.hash(newPassword)
    const userUpdated = await this.userRespository.updateUser(id, { password: newPasswordHash })
    return {
      success: true,
      data: userUpdated.toObjectSafe()
    }
  }
}
