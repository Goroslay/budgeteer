import morgan from 'morgan'

const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
const morganSkip = (req, res) => process.env.NODE_ENV === 'test'

export const morganMiddleware = morgan(morganFormat, { skip: morganSkip })
