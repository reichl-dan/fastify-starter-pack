/**
 * The environment the application is running in
 */
export const nodeEnv =
  String(process.env.NODE_ENV).toLowerCase() === 'production'
    ? 'production'
    : 'development'

/**
 * The production mode of the application
 */
export const isProduction = nodeEnv === 'production'

/**
 * The development mode of the application
 */
export const isDevelopment = nodeEnv === 'development'

/**
 * The port the application is running on
 */
export const port =
  process.env.PORT && Number.parseInt(process.env.PORT) > 0
    ? Number.parseInt(process.env.PORT)
    : 3000

/**
 * The host the application is running on
 */
export const host =
  process.env.HOST ??
  (nodeEnv === 'production' ? '0.0.0.0' : 'localhost')

/**
 * The log level for the application
 */
export const logLevel = (process.env.LOG_LEVEL ?? 'info') as
  | 'fatal'
  | 'error'
  | 'warn'
  | 'info'
  | 'debug'
  | 'trace'
  | 'silent'

/**
 * The secret key for the cookie
 */
export const cookieSecret = process.env.COOKIE_SECRET ?? 'development-secret'
