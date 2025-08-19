import bcrypt from 'bcryptjs'
import { PasswordHasherPort } from '../../domain/ports/PasswordHasherPort.js'
export class BcryptService extends PasswordHasherPort {
  constructor (rounds = 10) {
    super()
    this.rounds = rounds
  }

  async hash (password) {
    return bcrypt.hash(password, this.rounds)
  }

  async compare (password, hash) {
    return bcrypt.compare(password, hash)
  }
}
