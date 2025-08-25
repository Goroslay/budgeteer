export default class AppError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }

  static unauthorized (message = 'Unauthorized') {
    return new AppError(message, 401)
  }

  static forbidden (message = 'Forbidden') {
    return new AppError(message, 403)
  }

  static badRequest (message = 'Bad Request') {
    return new AppError(message, 400)
  }

  static notFound (message = 'Not Found') {
    return new AppError(message, 404)
  }

  static conflict (message = 'Conflict') {
    return new AppError(message, 409)
  }

  static tooManyRequest (message = 'Too Many Requests') {
    return new AppError(message, 429)
  }
}
