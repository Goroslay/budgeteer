import { configDotenv } from 'dotenv'

configDotenv()

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000)
}
