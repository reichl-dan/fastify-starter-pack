import fp from 'fastify-plugin'
import * as config from './config.js'
import { registerCookie } from './plugins/cookie.js'
import { registerCors } from './plugins/cors.js'
import { registerErrorHandler } from './plugins/error-handler.js'
import { registerHealthCheck } from './plugins/health-check.js'
import { registerHelmet } from './plugins/helmet.js'
import { registerLogger } from './plugins/logger.js'
import { registerMonitoring } from './plugins/monitoring.js'
import { registerRateLimit } from './plugins/rate-limit.js'
import { registerSensible } from './plugins/sensible.js'
import { registerStartServer } from './plugins/start-server.js'

/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('types/index.d.ts').FastifyCoreOptions} FastifyCoreOptions
 */

/**
 * Registers all plugins with the given options
 * @param {FastifyInstance} server - The Fastify server instance
 * @param {FastifyCoreOptions} [options={}] - The plugin options
 */
async function defineFastifyCore(server, options = {}) {
  // Register production plugins
  await registerLogger(server, options.logger)
  await registerErrorHandler(server)
  await registerMonitoring(server)
  await registerSensible(server)
  await registerCors(server, options.cors)
  await registerHelmet(server, options.helmet)
  await registerCookie(server, options.cookie)
  await registerRateLimit(server, options.rateLimit)

  // Register development plugins
  if (config.isDevelopment) {
    const { registerSwagger } = await import('./plugins/swagger.js')
    await registerSwagger(server, options.swagger)
  }

  // Register server start decorator
  await registerStartServer(server)

  // Register health check route
  await registerHealthCheck(server, options.healthCheck)
}

export default fp(defineFastifyCore, {
  name: 'fastify-core',
  fastify: '4.x',
  dependencies: [],
})
