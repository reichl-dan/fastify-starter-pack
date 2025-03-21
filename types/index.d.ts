import type { FastifyPluginAsync } from 'fastify'
import type { CorsOptions } from './plugins/cors'
import type { HealthCheckOptions } from './plugins/health-check'
import type { HelmetOptions } from './plugins/helmet'
import type { LoggerPluginOptions } from './plugins/logger'
import type { RateLimitOptions } from './plugins/rate-limit'
import type { SwaggerOptions } from './plugins/swagger'

// *************************************************************************************
// Export types for built-in plugins
export * from '@fastify/cookie'
export * from '@fastify/cors'
export * from '@fastify/helmet'
export * from '@fastify/rate-limit'
export * from '@fastify/sensible'
export * from '@fastify/swagger-ui'
export * from '@fastify/swagger'

// *************************************************************************************
// Extend FastifyInstance with custom plugins
declare module 'fastify' {
  interface FastifyInstance {
    /**
     * Starts the Fastify server with built-in handling for shutdown signals.
     * @returns {Promise<void>}
     */
    start(): Promise<void>
  }
}

// *************************************************************************************
// Interface for the core plugin options
export interface FastifyCoreOptions {
  cookie?: import('./plugins/cookie.d.ts').CookieOptions
  cors?: import('./plugins/cors.d.ts').CorsOptions
  healthCheck?: import('./plugins/health-check.d.ts').HealthCheckOptions
  helmet?: import('./plugins/helmet.d.ts').HelmetOptions
  logger?: import('./plugins/logger.d.ts').LoggerPluginOptions
  rateLimit?: import('./plugins/rate-limit.d.ts').RateLimitOptions
  swagger?: import('./plugins/swagger.d.ts').SwaggerOptions
}

// *************************************************************************************
// Export the core plugin
declare const fastifyCore: FastifyPluginAsync<FastifyCoreOptions>
export default fastifyCore
