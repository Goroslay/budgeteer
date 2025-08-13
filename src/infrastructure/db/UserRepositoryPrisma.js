import { User } from '../../domain/entities/User.js'
import { UserRepository } from '../../domain/UserRepository.js'
import { prisma } from './prismaClient.js'

export class UserRepositoryPrisma extends UserRepository {
  async createUser (userData) {
    const {
      fullname,
      email,
      username,
      _passwordHash: password,
      country
    } = userData

    try {
      const newUser = await prisma.user.create({
        data: {
          fullname,
          email,
          username,
          password,
          country
        }
      })
      return this.#toDomain(newUser)
    } catch (error) {
      console.error('Error creating user:', error)
      throw new Error('User creation failed')
    }
  }

  async findUserById (user_id) {
    const user = await prisma.user.findUnique({
      where: { user_id }
    })
    return user ? this.#toDomain(user) : null
  }

  async findUserByEmail (email) {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return user ? this.#toDomain(user) : null
  }

  async findUserByUserName (username) {
    const user = await prisma.user.findUnique({
      where: { username }
    })
    return user ? this.#toDomain(user) : null
  }

  async updateUser (user_id, data) {
    const updateFields = {}
    const { fullname, email, username, passwordHash, country, active } = data
    if (fullname !== undefined) updateFields.fullname = fullname
    if (email !== undefined) updateFields.email = email
    if (username !== undefined) updateFields.username = username
    if (passwordHash !== undefined) updateFields.passwordHash = passwordHash
    if (country !== undefined) updateFields.country = country
    if (active !== undefined) updateFields.active = active

    try {
      const user = await prisma.user.update({
        where: { user_id },
        data: updateFields
      })
      return this.#toDomain(user)
    } catch (error) {
      console.error('Error updating user:', error)
      throw new Error('User update failed')
    }
  }

  async deleteUser (user_id) {
    try {
      await prisma.user.delete({
        where: { user_id }
      })
      return true
    } catch (error) {
      console.error('Error deleting user: ', error)
      throw new Error('User update failed')
    }
  }

  async activateUser (user_id) {
    const user = await prisma.user.update({
      where: { user_id },
      data: { active: true }
    })
    return this.#toDomain(user)
  }

  async desactivateUser (user_id) {
    const user = await prisma.user.update({
      where: { user_id },
      data: { active: false }
    })
    return this.#toDomain(user)
  }

  async list ({ take = 50, skip = 0, active = undefined } = {}) {
    const users = await prisma.user.findMany({
      where: active === undefined ? {} : { active },
      orderBy: { createdAt: 'desc' },
      take,
      skip
    })
    return users.map(user => this.#toDomain(user))
  }

  #toDomain (user) {
    return new User({
      user_id: user.user_id,
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      passwordHash: user.password,
      active: user.active,
      country: user.country,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  }
}
