import bcrypt from 'bcryptjs'
export class BcryptService {
  constructor (rounds = 10) {
    this.rounds = rounds
  }

  async hash (plain) {
    return bcrypt.hash(plain, this.rounds)
  }

  async compare (plain, hash) {
    return bcrypt.compare(plain, hash)
  }
}
