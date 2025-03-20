import type { FastifyPluginCallback } from 'fastify'
import type { CookieOptions } from './plugins/cookie'
import type { CorsOptions } from './plugins/cors'
import type { HealthCheckOptions } from './plugins/health-check'
import type { HelmetOptions } from './plugins/helmet'
import type { LoggerPluginOptions } from './plugins/logger'
import type { RateLimitOptions } from './plugins/rate-limit'
import type { SwaggerOptions } from './plugins/swagger'

export interface FastifyCoreOptions {
  cookie?: CookieOptions
  cors?: CorsOptions
  healthCheck?: HealthCheckOptions
  helmet?: HelmetOptions
  logger?: LoggerPluginOptions
  rateLimit?: RateLimitOptions
  swagger?: SwaggerOptions
}

declare module 'fastify' {
  interface FastifyInstance {
    start(): Promise<void>
  }
}

declare const fastifyCore: FastifyPluginCallback<FastifyCoreOptions>
export default fastifyCore
export { fastifyCore }
