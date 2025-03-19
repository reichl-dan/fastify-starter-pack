import type { FastifyInstance } from 'fastify'
import { type CookieOptions, registerCookie } from './cookie'
import { type CorsOptions, registerCors } from './cors'
import { registerErrorHandler } from './error-handler'
import { type HelmetOptions, registerHelmet } from './helmet'
import { type LoggerPluginOptions, registerLogger } from './logger'
import { registerMonitoring } from './monitoring'
import { type RateLimitOptions, registerRateLimit } from './rate-limit'
import { registerSensible } from './sensible'
import { registerServerStart } from './server-start'
import type { SwaggerOptions } from './swagger'

/**
 * Interface for plugin options
 */
export interface PluginOptions {
  cookie?: CookieOptions
  cors?: CorsOptions
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
export async function registerPlugins(
  server: FastifyInstance,
  options: PluginOptions,
): Promise<void> {
  // Register production plugins
  await registerLogger(server, options.logger)
  await registerErrorHandler(server)
  await registerMonitoring(server)
  await registerServerStart(server)
  await registerSensible(server)
  await registerCors(server, options.cors)
  await registerHelmet(server, options.helmet)
  await registerCookie(server, options.cookie)
  await registerRateLimit(server, options.rateLimit)

  // Register development plugins
  if (process.env.NODE_ENV === 'development') {
    const { registerSwagger } = await import('./swagger.js')
    await registerSwagger(server, options.swagger)
  }
}
