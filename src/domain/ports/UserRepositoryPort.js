export class UserRepositoryPort {
  async findUserByEmail (email) {
    throw new Error('Method findUserByEmail must be implemented')
  }

  async findUserByUsername (username) {
    throw new Error('Method findUserByUsername must be implemented')
  }

  async findUserById (userId) {
    throw new Error('Method findUserById must be implemented')
  }

  async createUser (userData) {
    throw new Error('Method createUser must be implemented')
  }

  async updateUser (userId, userData) {
    throw new Error('Method updateUser must be implemented')
  }

  async deleteUser (userId) {
    throw new Error('Method deleteUser must be implemented')
  }

  async list (filters) {
    throw new Error('Method list must be implemented')
  }

  async activateUser (userId) {
    throw new Error('Method activateUser must be implemented')
  }

  async deactivateUser (userId) {
    throw new Error('Method deactivateUser must be implemented')
  }
}
