// import dependencies
import * as config from './config'
import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'

// import plugin types
import type { CookieOptions } from './plugins/cookie'
import type { CorsOptions } from './plugins/cors'
import type { HealthCheckOptions } from './plugins/health-check'
import type { HelmetOptions } from './plugins/helmet'
import type { LoggerPluginOptions } from './plugins/logger'
import type { RateLimitOptions } from './plugins/rate-limit'
import type { SwaggerOptions } from './plugins/swagger'

/**
 * Interface for plugin options
 */
export interface FastifyCoreOptions {
  cookie?: CookieOptions
  cors?: CorsOptions
  healthCheck?: HealthCheckOptions
  helmet?: HelmetOptions
  logger?: LoggerPluginOptions
  rateLimit?: RateLimitOptions
  swagger?: SwaggerOptions
}

/**
 * Registers all plugins with the given options
 * @param server - The Fastify server instance
 * @param options - The plugin options
 */
async function corePlugin(
  server: FastifyInstance,
  options?: FastifyCoreOptions,
): Promise<void> {
  // Register logger plugin
  {
    const { registerLogger } = await import('./plugins/logger.js')
    await registerLogger(server, options?.logger)
  }

  // Register error handler plugin
  {
    const { registerErrorHandler } = await import('./plugins/error-handler.js')
    await registerErrorHandler(server)
  }

  // Register monitoring plugin
  {
    const { registerMonitoring } = await import('./plugins/monitoring.js')
    await registerMonitoring(server)
  }

  // Register sensible plugin
  {
    const { registerSensible } = await import('./plugins/sensible.js')
    await registerSensible(server)
  }

  // Register cors plugin
  {
    const { registerCors } = await import('./plugins/cors.js')
    await registerCors(server, options?.cors)
  }

  // Register helmet plugin
  {
    const { registerHelmet } = await import('./plugins/helmet.js')
    await registerHelmet(server, options?.helmet)
  }

  // Register cookie plugin
  {
    const { registerCookie } = await import('./plugins/cookie.js')
    await registerCookie(server, options?.cookie)
  }

  // Register rate limit plugin
  {
    const { registerRateLimit } = await import('./plugins/rate-limit.js')
    await registerRateLimit(server, options?.rateLimit)
  }

  // Register swagger plugin
  if (config.isDevelopment) {
    const { registerSwagger } = await import('./plugins/swagger.js')
    await registerSwagger(server, options?.swagger)
  }

  // Register start decorator
  {
    const { registerStartServer } = await import('./plugins/start-server.js')
    await registerStartServer(server)
  }

  // Register health route
  {
    const { registerHealthCheck } = await import('./plugins/health-check.js')
    await registerHealthCheck(server, options?.healthCheck)
  }
}

/**
 * Fastify plugin for core functionality
 */
export default fp(corePlugin, {
  name: 'fastify-core',
  dependencies: [],
})
