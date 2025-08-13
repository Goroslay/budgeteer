import { User } from '../../domain/entities/User.js'
export class CreateUserService {
  constructor (userRespository, passwordHasher) {
    this.userRespository = userRespository
    this.passwordHasher = passwordHasher
  }

  async execute ({
    fullname,
    email,
    username,
    password,
    country
  }) {
    const [byEmail, byUsername] = await Promise.all([
      this.userRespository.findByEmail(email),
      this.userRespository.findByUserName(username)
    ])
    if (byEmail) throw new Error('Email duplicated')
    if (byUsername) throw new Error('Username duplicated')

    const passwordHash = await this.passwordHasher.hash(password)
    const user = User.create({
      fullname,
      email,
      username,
      passwordHash,
      country
    })

    const userCreated = await this.userRespository.create({
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      passwordHash: user._passwordHash,
      country: user.country
    })
    return userCreated
  }
}
