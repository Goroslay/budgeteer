import { User } from '../../domain/entities/User.js'
import { ListUserDTO, LoginUserDTO, RegisterUserDTO, UpdateMeDTO } from '../dto/userDTO.js'
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
    if (byEmail) throw new Error('Email duplicated')
    if (byUsername) throw new Error('Username duplicated')

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
    if (!username && !email) throw new Error('Username or email is required')
    if (!password) throw new Error('Password is required')
    const user = username ? await this.userRespository.findUserByUsername(username) : await this.userRespository.findUserByEmail(email)
    if (!user) throw new Error('Invalid credentials')

    const isValidPassword = await this.passwordHasher.compare(password, user._passwordHash)
    if (!isValidPassword) throw new Error('Invalid credentials')

    const token = this.tokenGenerator.generate({ id: user.user_id, role: user.role })

    return {
      data: user.toObjectSafe(),
      token
    }
  }

  async updateMe (updateMeRequest) {
    const updateMeDto = new UpdateMeDTO(updateMeRequest)
    const { token, username, fullname, country, email } = updateMeDto.toDomain()
    const userDecoded = await this.#decodedToken(token)
    const id = userDecoded.user_id
    if (username) {
      const byUsername = await this.userRespository.findUserByUsername(username)
      if (byUsername && byUsername.user_id !== id) throw new Error('Username duplicated')
    }
    if (email) {
      const byEmail = await this.userRespository.findUserByEmail(email)
      if (byEmail && byEmail.user_id !== id) throw new Error('Email duplicated')
    }
    const updatedUser = await this.userRespository.updateMe(id, { username, fullname, country, email })
    return {
      data: updatedUser.toObjectSafe()
    }
  }

  async listUsers (listUsersRequest = {}) {
    const listQuery = { ...listUsersRequest.where, take: listUsersRequest.take, skip: listUsersRequest.skip }
    const listUserDTO = ListUserDTO.fromQuery(listQuery)
    const token = listUsersRequest.token
    const userDecoded = await this.#decodedToken(token)
    if (userDecoded.role !== 'admin') throw new Error('Invalid authorization')
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

  async listMe (token) {
    const userDecoded = await this.#decodedToken(token)
    return {
      data: userDecoded.toObjectSafe()
    }
  }

  async deleteMe (token) {
    const userDecoded = await this.#decodedToken(token)
    return await this.userRespository.deleteUser(userDecoded.user_id)
  }

  async deleteUser (id, token) {
    const userDecoded = await this.#decodedToken(token)
    if (userDecoded.role !== 'admin') throw new Error('Invalid authorization')
    const userToDelete = await this.userRespository.findUserById(id)
    if (!userToDelete) throw new Error('Invalid User')
    return await this.userRespository.deleteUser(id)
  }

  async #decodedToken (token) {
    const decoded = this.tokenGenerator.validate(token)
    const { id } = decoded.payload
    if (!id) throw new Error('Invalid authorization')
    const userDecoded = await this.userRespository.findUserById(id)
    console.log(userDecoded)
    if (!userDecoded) throw new Error('Invalid User')
    return userDecoded
  }
}
