import { User } from '../../domain/entities/User.js'
import { UserRepositoryPort } from '../../domain/ports/UserRepositoryPort.js'
import { prisma } from './prismaClient.js'

export class UserRepositoryPrisma extends UserRepositoryPort {
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

  async findUserById (id) {
    const user = await prisma.user.findUnique({
      where: { user_id: id }
    })
    return user ? this.#toDomain(user) : null
  }

  async findUserByEmail (email) {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return user ? this.#toDomain(user) : null
  }

  async findUserByUsername (username) {
    const user = await prisma.user.findUnique({
      where: { username }
    })
    return user ? this.#toDomain(user) : null
  }

  async updateMe (id, data) {
    const updateFields = {}
    const { fullname, email, username, country } = data
    if (fullname !== undefined) updateFields.fullname = fullname
    if (email !== undefined) updateFields.email = email
    if (username !== undefined) updateFields.username = username
    if (country !== undefined) updateFields.country = country

    try {
      const user = await prisma.user.update({
        where: { user_id: id },
        data: updateFields
      })
      return this.#toDomain(user)
    } catch (error) {
      console.error('Error updating user:', error)
      throw new Error('User update failed')
    }
  }

  async deleteUser (id) {
    try {
      await prisma.user.delete({
        where: { user_id: id }
      })
      return true
    } catch (error) {
      console.error('Error deleting user: ', error)
      throw new Error('User delete failed')
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

  async list ({ where = {}, take = 50, skip = 0 } = {}) {
    const users = await prisma.user.findMany({
      where,
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
      updatedAt: user.updatedAt,
      role: user.role
    })
  }
}
