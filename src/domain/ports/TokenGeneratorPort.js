export class TokenGeneratorPort {
  async generate (payload) {
    throw new Error('Method generate must be implemented')
  }

  async validate (token) {
    throw new Error('Method validate must be implemented')
  }
}
