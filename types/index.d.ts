/// <reference types='node' />
import type { FastifyPluginAsync } from 'fastify'
import type { CookieOptions } from './cookie'
import type { CorsOptions } from './cors'
import type { HealthCheckOptions } from './health-check'
import type { HelmetOptions } from './helmet'
import type { LoggerPluginOptions } from './logger'
import type { RateLimitOptions } from './rate-limit'
import type { SwaggerOptions } from './swagger'

// Extend FastifyInstance with start method
declare module 'fastify' {
  interface FastifyInstance {
    /**
     * Starts the Fastify server with built-in handling for shutdown signals.
     * @returns {Promise<void>}
     */
    start(): Promise<void>
  }
}

type FastifyCore = FastifyPluginAsync<fastifyCore.FastifyCoreOptions>

declare namespace fastifyCore {
  export interface FastifyCoreOptions {
    cookie?: CookieOptions
    cors?: CorsOptions
    healthCheck?: HealthCheckOptions
    helmet?: HelmetOptions
    logger?: LoggerPluginOptions
    rateLimit?: RateLimitOptions
    swagger?: SwaggerOptions
  }

  export const fastifyCore: FastifyCore
  export { fastifyCore as default }
}

declare function fastifyCore(
  ...params: Parameters<FastifyCore>
): ReturnType<FastifyCore>
export = fastifyCore
