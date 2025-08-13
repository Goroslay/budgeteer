import { User } from '../../domain/entities/User.js'
export class UserService {
  constructor (userRespository, passwordHasher, tokenGenerator) {
    this.userRespository = userRespository
    this.passwordHasher = passwordHasher
    this.tokenGenerator = tokenGenerator
  }

  async registerUser ({
    fullname,
    email,
    username,
    password,
    country
  }) {
    const [byEmail, byUsername] = await Promise.all([
      this.userRespository.findUserByEmail(email),
      this.userRespository.findUserByUserName(username)
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
    const token = this.tokenGenerator.generateJWT(savedUser.user_id)

    return {
      data: savedUser.toObjectSafe(),
      token
    }
  }

  async loginUser ({
    username = null,
    email = null,
    password
  }) {
    if (!username && !email) throw new Error('Username or email is required')
    if (!password) throw new Error('Password is required')
    const user = username ? await this.userRespository.findUserByUserName(username) : await this.userRespository.findUserByEmail(email)
    if (!user) throw new Error('Invalid credentials')

    const isValidPassword = await this.passwordHasher.compare(password, user._passwordHash)
    if (!isValidPassword) throw new Error('Invalid credentials')

    const token = this.tokenGenerator.generateJWT(user.user_id)

    return {
      success: true,
      data: user.toObjectSafe(),
      token
    }
  }
}
